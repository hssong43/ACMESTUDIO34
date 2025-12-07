'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '신입학 (Freshman)',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct HTML Email (Blue Theme)
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0; padding:0; background-color:#F8FAFC; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background-color: #1E293B; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">NEW INQUIRY</h1>
            <p style="color: #94A3B8; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">General Contact Form</p>
          </div>

          <!-- Details -->
          <div style="padding: 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
              <tr>
                <td style="padding-bottom: 15px;">
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Client Name</strong>
                  <span style="color:#0F172A; font-size:18px; font-weight:bold;">${formData.name}</span>
                </td>
                <td style="padding-bottom: 15px;">
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Purpose</strong>
                  <span style="color:#0F172A; font-size:16px; font-weight:bold; background-color:#F1F5F9; padding:4px 8px; border-radius:4px;">${formData.purpose}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Phone</strong>
                  <span style="color:#334155; font-size:15px;">${formData.phone}</span>
                </td>
                <td>
                  <strong style="display:block; color:#64748B; font-size:12px; text-transform:uppercase;">Email</strong>
                  <span style="color:#334155; font-size:15px;">${formData.email}</span>
                </td>
              </tr>
            </table>

            <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;">

            <p style="margin:0 0 10px 0; font-size:12px; font-weight:bold; color:#64748B; text-transform:uppercase;">Message Content</p>
            <div style="background:#F8FAFC; padding:20px; border-radius:8px; border:1px solid #E2E8F0; color:#334155; font-size:15px; line-height:1.6;">
              "${formData.message}"
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #F8FAFC; padding: 20px; text-align: center; border-top: 1px solid #E2E8F0;">
             <a href="mailto:${formData.email}" style="display:inline-block; background-color:#1E293B; color:#ffffff; text-decoration:none; padding:10px 20px; border-radius:6px; font-size:14px; font-weight:bold;">Reply via Email</a>
          </div>

        </div>
      </body>
      </html>
    `;

    // Send Email
    const templateParams = {
      to_name: 'Admin',
      from_name: formData.name,
      message: htmlMessage,
      phone: formData.phone,
    };

    emailjs
      .send(
        'service_nd18weq',
        'template_ilzta7b',
        templateParams,
        'Rb0IUfWNMjtodRhho'
      )
      .then(
        () => {
          setLoading(false);
          setCompleted(true);
        },
        (error) => {
          setLoading(false);
          alert('전송 실패: ' + error.text);
        }
      );
  };

  if (completed) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white p-12 rounded-2xl shadow-lg border border-slate-100 text-center max-w-lg w-full">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            문의가 접수되었습니다.
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            담당 컨설턴트가 내용을 확인하고 있습니다.
            <br />
            48시간 이내에 <strong>{formData.email}</strong> 혹은{' '}
            <strong>{formData.phone}</strong>으로 연락드리겠습니다.
          </p>
          <a
            href="/"
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded font-bold hover:bg-slate-800 transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
          방문 상담은 100% 예약제로 운영됩니다. <br />
          아래 양식을 작성해주시면 가장 빠른 일정을 안내해드립니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-100">
          {/* Info Side */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 text-slate-900">
                상담 센터 안내
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                학생의 현재 상황과 목표를 구체적으로 적어주실수록
                <br />더 정확한 초기 상담이 가능합니다.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">
                      Location
                    </strong>
                    <span className="text-slate-600 text-sm">
                      서울특별시 강남구 도산대로 123, 4F
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">Phone</strong>
                    <span className="text-slate-600 text-sm">02-1234-5678</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">Hours</strong>
                    <span className="text-slate-600 text-sm">
                      월-금 10:00 - 21:00 / 토 10:00 - 18:00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 font-bold mb-2 uppercase">
                Tips
              </p>
              <p className="text-sm text-slate-600">
                포트폴리오 파일(PDF)이 있으신 경우, 상담 예약 확정 후 담당자
                이메일로 별도 송부 부탁드립니다.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                이름
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded focus:border-yellow-500 outline-none transition-colors"
                required
                placeholder="학생 본인 혹은 학부모님 성함"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 rounded focus:border-yellow-500 outline-none transition-colors"
                  required
                  placeholder="010-0000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 rounded focus:border-yellow-500 outline-none transition-colors"
                  required
                  placeholder="sample@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                지원 목적
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded focus:border-yellow-500 outline-none bg-white"
              >
                <option>신입학 (Freshman)</option>
                <option>편입 (Transfer)</option>
                <option>대학원 (Master/PhD)</option>
                <option>기타 (상담 후 결정)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                문의 내용
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-slate-200 rounded focus:border-yellow-500 outline-none transition-colors resize-none"
                placeholder="현재 학년, 목표 대학, 고민되는 점 등을 자유롭게 적어주세요."
                required
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? '전송 중...' : '문의하기'}
              </button>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4">
              보내주신 정보는 상담 목적 외에는 사용되지 않습니다.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
