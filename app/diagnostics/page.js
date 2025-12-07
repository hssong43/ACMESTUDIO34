"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// --- DATA LISTS ---
const COUNTRIES = ["미국 (USA)", "영국 (UK)", "유럽 (Europe)", "캐나다 (Canada)", "아시아 (Asia)", "기타"];
const SCHOOL_TYPES = ["국제학교", "외국인 학교", "일반고", "예술고", "해외고", "검정고시", "대학 재학", "대학 졸업"];
const GRADES = ["9학년", "10학년", "11학년", "12학년", "Gap Year/재수", "대학생", "성인"];
const UNIVERSITIES = [
  "--- 미국 (US Top Tier) ---", "RISD", "Parsons", "Cooper Union", "Yale", "SAIC", "Pratt", "SVA", "CalArts", "ArtCenter", "Carnegie Mellon",
  "--- 영국 (UK Top Tier) ---", "RCA (Royal College of Art)", "CSM (Central Saint Martins)", "Goldsmiths", "Slade", "Glasgow School of Art",
  "--- 기타 ---", "기타 (직접 입력)"
];
const MAJORS = [
  "Fine Arts (순수미술)", "Graphic Design (시각디자인)", "Architecture (건축/공간)", "Fashion (패션)", "Industrial Design (산업)", "Illustration (일러)", "Digital/Media (미디어)", "Undecided (미정)"
];

// --- TEST DATA (Part 1: Sensory) ---
const SENSORY_TEST = [
  { id: 'process', category: 'Process', question: '작업을 시작할 때 스타일은?', A: '철저한 계획 (Planning)', B: '즉흥적 실험 (Intuition)' },
  { id: 'subject', category: 'Subject', question: '더 끌리는 소재는?', A: '현실 관찰 (Observational)', B: '상상의 세계 (Abstract)' },
  { id: 'focus', category: 'Focus', question: '중요하게 여기는 것은?', A: '기술적 완성도 (Technique)', B: '의미와 스토리 (Meaning)' },
  { id: 'style', category: 'Style', question: '선호하는 분위기는?', A: '깔끔한 선 (Clean)', B: '역동적 에너지 (Expressive)' },
  { id: 'motivation', category: 'Motivation', question: '창작의 동기는?', A: '문제 해결 (Design)', B: '감정 표출 (Fine Art)' }
];

export default function Diagnostics() {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', phone: '', schoolType: '', grade: '',
    targetCountry: '', targetUniv: '', customTargetUniv: '', major: '',
    sensory: { process: '', subject: '', focus: '', style: '', motivation: '' },
    deepDive: { trashProject: '', valueChoice: '', hatedWork: '' },
    gap: { technical: 3, idea: 3, critique: 3, completion: 3 }
  });

  const totalSteps = 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSensoryChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      sensory: { ...prev.sensory, [id]: value }
    }));
  };

  const handleDeepDiveChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      deepDive: { ...prev.deepDive, [name]: value }
    }));
  };

  const handleGapChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      gap: { ...prev.gap, [key]: parseInt(value) }
    }));
  };
  
  const handleNext = () => {
    window.scrollTo(0, 0);
    setStep(step + 1);
  };
  const handlePrev = () => setStep(step - 1);
  
  // --- SUBMIT HANDLER (NO AI, PURE HTML EMAIL) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Helper Functions for HTML Generation
    const getBar = (score) => {
      const width = (score / 5) * 100;
      const color = score >= 4 ? '#EAB308' : '#94A3B8'; 
      return `
        <div style="background-color: #e2e8f0; width: 100%; height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="background-color: ${color}; width: ${width}%; height: 100%;"></div>
        </div>
      `;
    };

    const getPill = (val) => {
      const isA = val.includes('A');
      const bg = isA ? '#EEF2FF' : '#FFF7ED'; 
      const text = isA ? '#4F46E5' : '#C2410C';
      const label = isA ? 'TYPE A' : 'TYPE B';
      return `<span style="background-color: ${bg}; color: ${text}; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">${label}</span>`;
    };

    // 2. Construct the HTML String
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0; padding:0; background-color:#F1F5F9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background-color: #0F172A; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">DIAGNOSTIC REPORT</h1>
            <p style="color: #EAB308; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Student Analysis Data</p>
          </div>

          <!-- Key Info Grid -->
          <div style="padding: 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
              <tr>
                <td style="padding-bottom: 15px;">
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Name</strong>
                  <span style="color:#0F172A; font-size:18px; font-weight:bold;">${formData.name}</span>
                </td>
                 <td style="padding-bottom: 15px;">
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Target</strong>
                  <span style="color:#0F172A; font-size:18px; font-weight:bold;">${formData.targetUniv === "기타 (직접 입력)" ? formData.customTargetUniv : formData.targetUniv}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Phone</strong>
                  <span style="color:#334155; font-size:15px;">${formData.phone}</span>
                </td>
                <td>
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Major</strong>
                  <span style="color:#334155; font-size:15px;">${formData.major}</span>
                </td>
              </tr>
            </table>

            <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;">

            <!-- Gap Analysis -->
            <h3 style="color: #0F172A; font-size: 16px; margin-bottom: 15px;">📊 Competency Gap</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
              ${Object.keys(formData.gap).map(key => `
                <tr>
                  <td width="30%" style="padding: 8px 0; font-size: 14px; color: #475569; text-transform: capitalize;">${key}</td>
                  <td width="70%" style="padding: 8px 0;">
                    <div style="display: flex; align-items: center;">
                      <span style="font-size: 12px; font-weight: bold; margin-right: 10px; width: 30px;">${formData.gap[key]}/5</span>
                      ${getBar(formData.gap[key])}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </table>

            <!-- Sensory Test -->
             <h3 style="color: #0F172A; font-size: 16px; margin-bottom: 15px;">🧠 Sensory Profile</h3>
             <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; color: #334155;">
               ${Object.keys(formData.sensory).map(key => `
                 <tr>
                   <td style="padding: 5px 0; text-transform: capitalize;">${key}</td>
                   <td align="right">${getPill(formData.sensory[key])}</td>
                 </tr>
               `).join('')}
             </table>
            
            <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 30px 0;">

            <!-- Deep Dive Answers -->
            <h3 style="color: #0F172A; font-size: 16px; margin-bottom: 15px;">📝 Deep Dive</h3>
            
            <div style="margin-bottom: 20px;">
              <p style="margin:0 0 5px 0; font-size:12px; font-weight:bold; color:#64748B; text-transform:uppercase;">Trash Project Strategy</p>
              <div style="background:#F8FAFC; padding:15px; border-radius:8px; font-style:italic; color:#334155; font-size:14px;">
                "${formData.deepDive.trashProject}"
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="margin:0 0 5px 0; font-size:12px; font-weight:bold; color:#64748B; text-transform:uppercase;">Value Choice</p>
              <div style="background:#F8FAFC; padding:15px; border-radius:8px; font-style:italic; color:#334155; font-size:14px;">
                Selected: ${formData.deepDive.valueChoice}
              </div>
            </div>

             <div style="margin-bottom: 20px;">
              <p style="margin:0 0 5px 0; font-size:12px; font-weight:bold; color:#64748B; text-transform:uppercase;">Hated Work (Resilience)</p>
              <div style="background:#F8FAFC; padding:15px; border-radius:8px; font-style:italic; color:#334155; font-size:14px;">
                "${formData.deepDive.hatedWork}"
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #F8FAFC; padding: 20px; text-align: center; border-top: 1px solid #E2E8F0;">
            <p style="margin:0; font-size: 12px; color: #94A3B8;">Submission Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Send Email
    const templateParams = {
      to_name: "Admin",
      from_name: formData.name,
      message: htmlMessage, 
      phone: formData.phone
    };

    emailjs.send(
      'service_nd18weq', 
      'template_ilzta7b', 
      templateParams, 
      'Rb0IUfWNMjtodRhho' 
    )
      .then((result) => {
          setLoading(false);
          setCompleted(true);
      }, (error) => {
          setLoading(false);
          alert("전송 실패: " + error.text);
      });
  };

  // --- RESULT SCREEN ---
  if (completed) {
    return (
      <div className="min-h-screen pt-32 px-6 flex justify-center text-center bg-slate-50">
        <div className="max-w-xl w-full bg-white p-12 rounded-2xl shadow-lg border border-slate-100">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900">진단이 완료되었습니다.</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
            제출해주신 <strong>성향 데이터</strong>를 바탕으로<br/>
            담당자가 48시간 이내에 <strong>'맞춤형 전략 리포트'</strong>를 보내드립니다.
          </p>
          <a href="/" className="inline-block bg-slate-900 text-white px-8 py-3 rounded font-bold hover:bg-slate-800 transition-colors">홈으로 돌아가기</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Header */}
        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 px-1 uppercase tracking-wider">
            <span className={step >= 1 ? "text-yellow-600" : ""}>Basic</span>
            <span className={step >= 2 ? "text-yellow-600" : ""}>Goal</span>
            <span className={step >= 3 ? "text-yellow-600" : ""}>Sensory</span>
            <span className={step >= 4 ? "text-yellow-600" : ""}>Deep Dive</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full mb-10 overflow-hidden">
          <div className="bg-slate-900 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>

        <form className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-100" onSubmit={handleSubmit}>
          
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">Step 1. 기본 정보</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">학생 이름</label>
                  <input type="text" name="name" onChange={handleChange} value={formData.name} className="w-full p-3 border rounded focus:border-yellow-500 outline-none" placeholder="홍길동" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">연락처</label>
                  <input type="tel" name="phone" onChange={handleChange} value={formData.phone} className="w-full p-3 border rounded focus:border-yellow-500 outline-none" placeholder="010-0000-0000" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">학교 유형</label>
                    <select name="schoolType" onChange={handleChange} value={formData.schoolType} className="w-full p-3 border rounded outline-none bg-white">
                      <option value="">선택</option>
                      {SCHOOL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">학년</label>
                    <select name="grade" onChange={handleChange} value={formData.grade} className="w-full p-3 border rounded outline-none bg-white">
                      <option value="">선택</option>
                      {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <button type="button" onClick={handleNext} disabled={!formData.name || !formData.phone} className="w-full bg-slate-900 text-white py-4 rounded font-bold mt-2 hover:bg-slate-800 disabled:opacity-50 transition-colors">다음</button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Goals */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">Step 2. 입시 목표</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">희망 국가</label>
                  <select name="targetCountry" onChange={handleChange} value={formData.targetCountry} className="w-full p-3 border rounded focus:border-yellow-500 outline-none bg-white">
                    <option value="">선택해주세요</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">1지망 대학</label>
                  <select name="targetUniv" onChange={handleChange} value={formData.targetUniv} className="w-full p-3 border rounded focus:border-yellow-500 outline-none bg-white">
                    <option value="">선택해주세요</option>
                    {UNIVERSITIES.map((u, i) => (
                      u.startsWith("---") ? <option key={i} disabled className="bg-slate-100 font-bold">{u}</option> : <option key={i} value={u}>{u}</option>
                    ))}
                  </select>
                  {formData.targetUniv === "기타 (직접 입력)" && (
                     <input type="text" name="customTargetUniv" onChange={handleChange} value={formData.customTargetUniv} className="mt-2 w-full p-3 border-2 border-yellow-500 rounded bg-yellow-50 outline-none" placeholder="학교명 입력" autoFocus />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">희망 전공</label>
                  <select name="major" onChange={handleChange} value={formData.major} className="w-full p-3 border rounded focus:border-yellow-500 outline-none bg-white">
                    <option value="">선택해주세요</option>
                    {MAJORS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handlePrev} className="flex-1 border py-3 rounded font-bold">이전</button>
                  <button type="button" onClick={handleNext} className="flex-1 bg-slate-900 text-white py-3 rounded font-bold">다음</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Sensory Test */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif font-bold mb-2 text-slate-900">Step 3. 성향 분석</h2>
              <p className="text-sm text-slate-500 mb-6">직관적으로 더 끌리는 쪽을 선택해주세요.</p>
              
              <div className="space-y-6">
                {SENSORY_TEST.map((item) => (
                  <div key={item.id} className="border-b border-slate-100 pb-6 last:border-0">
                    <h3 className="text-md font-bold text-slate-800 mb-3">{item.question} <span className="text-slate-400 font-normal text-xs ml-2">{item.category}</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleSensoryChange(item.id, 'A')}
                        className={`p-4 rounded-lg text-sm text-left transition-all border-2 ${
                          formData.sensory[item.id] === 'A' 
                          ? 'border-yellow-500 bg-yellow-50 text-slate-900 font-bold shadow-md' 
                          : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-400 block mb-1">TYPE A</span>
                        {item.A}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSensoryChange(item.id, 'B')}
                        className={`p-4 rounded-lg text-sm text-left transition-all border-2 ${
                          formData.sensory[item.id] === 'B' 
                          ? 'border-slate-800 bg-slate-800 text-white font-bold shadow-md' 
                          : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-400 block mb-1">TYPE B</span>
                        {item.B}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 pt-4">
                  <button type="button" onClick={handlePrev} className="flex-1 border py-3 rounded font-bold">이전</button>
                  <button 
                    type="button" 
                    onClick={handleNext}
                    disabled={Object.values(formData.sensory).some(val => val === '')}
                    className="flex-1 bg-slate-900 text-white py-3 rounded font-bold disabled:opacity-50 hover:bg-slate-800"
                  >
                    다음
                  </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Deep Dive & Gap Analysis */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif font-bold mb-2 text-slate-900">Step 4. 심층 진단</h2>
              <p className="text-sm text-slate-500 mb-8">당신의 잠재력과 현재 상태의 간극(Gap)을 확인합니다.</p>
              
              <div className="space-y-6 mb-12">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Q1. 쓰레기(Trash)만을 사용해 작품을 만들어야 한다면?</label>
                  <textarea 
                    name="trashProject" 
                    value={formData.deepDive.trashProject} 
                    onChange={handleDeepDiveChange}
                    className="w-full p-3 border rounded focus:border-yellow-500 outline-none text-sm h-24 resize-none" 
                    placeholder="무엇을 만들고 그 이유는 무엇인가요?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Q2. 더 나쁜 것은?</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
                      <input type="radio" name="valueChoice" value="Technique" onChange={handleDeepDiveChange} className="text-yellow-500 focus:ring-yellow-500" />
                      <span className="text-sm">완벽한 테크닉이지만 의미가 없는 그림</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
                      <input type="radio" name="valueChoice" value="Meaning" onChange={handleDeepDiveChange} className="text-yellow-500 focus:ring-yellow-500" />
                      <span className="text-sm">심오한 의미가 있지만 테크닉이 엉망인 그림</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Q3. 가장 싫어하는(망친) 작품은?</label>
                  <textarea 
                    name="hatedWork"
                    value={formData.deepDive.hatedWork}
                    onChange={handleDeepDiveChange}
                    className="w-full p-3 border rounded focus:border-yellow-500 outline-none text-sm h-24 resize-none" 
                    placeholder="그 이유는 무엇이었나요?"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">자신감 진단 (1-5)</h3>
                <div className="space-y-6">
                  {[
                    { key: 'technical', label: 'Technical Drafting', desc: '보이는 그대로 정확한 비율로 그릴 수 있다.' },
                    { key: 'idea', label: 'Idea Generation', desc: '아이디어가 많아 어떤 것을 고를지 모를 정도다.' },
                    { key: 'critique', label: 'Critique', desc: '내 작품이 왜 좋은지/나쁜지 미술 용어로 설명할 수 있다.' },
                    { key: 'completion', label: 'Completion', desc: '시작한 작품은 포기하지 않고 끝까지 완성한다.' },
                  ].map((skill) => (
                    <div key={skill.key}>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-sm font-bold text-slate-800">{skill.label}</label>
                        <span className="text-xs text-yellow-600 font-bold">{formData.gap[skill.key]} / 5</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" max="5" 
                        value={formData.gap[skill.key]}
                        onChange={(e) => handleGapChange(skill.key, e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={handlePrev} className="flex-1 border py-3 rounded font-bold">이전</button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-yellow-500 text-slate-900 py-3 rounded font-bold hover:bg-yellow-400 shadow-lg transition-transform hover:scale-105"
                >
                  {loading ? '제출 중...' : '진단 결과 제출하기'}
                </button>
              </div>
            </motion.div>
          )}

        </form>
      </div>
    </div>
  );
}