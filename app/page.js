"use client";
import { motion } from 'framer-motion';
// Note the relative path (../) for StackBlitz
import Button from '../components/Button';
import { Brain, FileSearch, MessageSquare, Gem } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('images/asd.png')" }}         />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            작품이 말하지 못한 이야기,<br />우리가 설계합니다.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-sans mb-10">
            유학 미술 입시를 위한 맞춤형 아트 포트폴리오 컨설팅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             {/* Temporary simple buttons until Button component is fully fixed */}
             <Link href="/contact" className="bg-yellow-500 text-slate-900 px-6 py-3 rounded font-bold hover:bg-yellow-400">무료 상담 신청</Link>
             <Link href="/portfolio" className="border-2 border-white text-white px-6 py-3 rounded font-bold hover:bg-white hover:text-slate-900">포트폴리오 보기</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded shadow-sm">
                <Brain className="w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">심층 진단</h3>
                <p className="text-slate-500 text-sm">학생의 정체성을 분석하여 고유한 시각 문법 도출</p>
            </div>
            <div className="bg-white p-8 rounded shadow-sm">
                <FileSearch className="w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">전략 수립</h3>
                <p className="text-slate-500 text-sm">대학별 데이터 분석에 기반한 타겟 로드맵 설계</p>
            </div>
            <div className="bg-white p-8 rounded shadow-sm">
                <MessageSquare className="w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">이원화 피드백</h3>
                <p className="text-slate-500 text-sm">기술(Tech)과 논리(Logic)를 분리하여 지도</p>
            </div>
            <div className="bg-white p-8 rounded shadow-sm">
                <Gem className="w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">전문가 마감</h3>
                <p className="text-slate-500 text-sm">현업 작가 팀 협업으로 압도적 퀄리티 완성</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}