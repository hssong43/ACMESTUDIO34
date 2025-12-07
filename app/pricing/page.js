import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const packages = [
    {
      name: "Basic",
      price: "상담 후 결정",
      target: "기본기 완성",
      features: ["기초 조형 및 드로잉", "관찰 드로잉 심화", "월 4회 크리틱", "재료학 기초"],
      highlight: false
    },
    {
      name: "Total Care",
      price: "Most Popular",
      target: "Top-Tier (Yale, RISD)",
      features: ["개인 멘토링 무제한", "포트폴리오 전 과정 제작", "에세이 원어민 첨삭", "전략 컨설팅 포함"],
      highlight: true
    },
    {
      name: "GPA Care",
      price: "Consultation",
      target: "실기+내신 밸런스",
      features: ["월 8회 멘토링", "IB/AP Art 과제 관리", "학교 성적 모니터링", "기초 포트폴리오"],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-4">Invest in your Future</h1>
          <p className="text-slate-500">학생의 목표와 상황에 맞춘 전략적 패키지입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`relative p-8 rounded-2xl border flex flex-col ${pkg.highlight ? 'border-yellow-500 bg-white shadow-xl transform md:-translate-y-4' : 'border-slate-200 bg-white shadow-sm'}`}>
              {pkg.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">추천 프로그램</div>}
              
              <h3 className="text-2xl font-serif font-bold mb-2 text-slate-900">{pkg.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{pkg.target}</p>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                href="/contact" 
                className={`w-full py-3 rounded-lg font-bold text-center transition-colors ${pkg.highlight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'border-2 border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'}`}
              >
                상담 신청
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}