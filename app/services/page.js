"use client";
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-4">Curriculum & Care System</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            단순한 미술 학원이 아닙니다. 아이디어 발상부터 최종 원서 접수까지, <br />
            합격에 필요한 모든 과정을 밀착 관리합니다.
          </p>
        </div>

        {/* Section 1: Portfolio Design */}
        <section className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="text-yellow-600 font-bold tracking-wider text-sm mb-2 block">MAIN TRACK</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">포트폴리오 디자인 & 인큐베이팅</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              자신만의 이야기를 시각적 언어로 번역하는 과정입니다. 대형 설치 미술(Installation)부터 
              실험적인 미디어 아트까지, 기존 입시 미술의 틀을 깬 독창적인 결과물을 만듭니다.
            </p>
            <ul className="space-y-3 mb-8">
              {['대형 작품(Installation) 제작 지원', '작품 촬영 및 전문 큐레이션', '원어민 에세이 교정 및 첨삭'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <div className="bg-yellow-100 p-1 rounded-full"><Check className="w-4 h-4 text-yellow-600" /></div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="inline-flex items-center text-slate-900 font-bold border-b-2 border-yellow-500 hover:text-yellow-600 transition-colors">
              상담 신청하기 <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 w-full h-80 bg-slate-200 rounded-xl overflow-hidden relative">
             <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000" className="object-cover w-full h-full" alt="Studio" />
          </div>
        </section>

        {/* Section 2: Mentoring */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 text-white rounded-2xl p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">1:1 하이퍼 멘토링</h3>
              <p className="text-slate-300 mb-6">
                국제학교 재학생 및 해외 거주 학생을 위한 온/오프라인 하이브리드 관리 시스템입니다.
                GPA와 AP Art 과제까지 통합 관리합니다.
              </p>
            </div>
            <ul className="space-y-2 mb-8 text-sm text-slate-300">
              <li>• 월 8회 대면/줌 세션</li>
              <li>• 슬랙(Slack)을 통한 상시 피드백</li>
              <li>• 타임존 맞춤형 스케줄링</li>
            </ul>
            <Link href="/contact" className="bg-yellow-500 text-slate-900 text-center py-3 rounded font-bold hover:bg-yellow-400 transition-colors">멘토링 신청</Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900">디지털 & 아카이빙</h3>
              <p className="text-slate-600 mb-6">
                과정을 시각화하는 Fabrication Log 제작. 작품의 발전 과정을 담은 프로세스 북과 
                영상 에세이를 제작하여 합격 확률을 높입니다.
              </p>
            </div>
            <ul className="space-y-2 mb-8 text-sm text-slate-600">
              <li>• 작업 프로세스 고화질 아카이빙</li>
              <li>• 2분 작가 소개 영상 (Video Essay)</li>
              <li>• SlideRoom 업로드 규격 최적화</li>
            </ul>
            <Link href="/contact" className="border-2 border-slate-900 text-slate-900 text-center py-3 rounded font-bold hover:bg-slate-900 hover:text-white transition-colors">제작 문의</Link>
          </div>
        </section>

      </div>
    </div>
  );
}