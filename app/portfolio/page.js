"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

// Mock Data
const portfolioItems = [
  { id: 1, title: "The Spectators", subtitle: "관조자들", category: "입시", img: "images/spectators.png", result: "RISD 합격" },
  { id: 2, title: "Bio-Structure", subtitle: "생분해성 소재 연구", category: "입시", img: "images/past and present.png", result: "Cornell AAP 장학생" },
  { id: 3, title: "Digital Noise", subtitle: "디지털 노이즈와 회화", category: "전시", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800", result: "개인전" },
  { id: 4, title: "Memory Archive", subtitle: "기억의 아카이빙", category: "레지던시", img: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800", result: "RCA 합격" },
  { id: 5, title: "Urban Decay", subtitle: "도시의 붕괴", category: "입시", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800", result: "Cooper Union" },
  { id: 6, title: "Plastic Ocean", subtitle: "환경 오염 설치 미술", category: "전시", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800", result: "Award Winner" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('전체');
  
  const filteredItems = filter === '전체' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-4">Portfolio Gallery</h1>
          <p className="text-slate-500">합격을 증명하는 우리의 결과물입니다.</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12">
          {['전체', '입시', '전시', '레지던시'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              key={item.id} 
              className="group cursor-pointer bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">
                  {item.result}
                </div>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-800 group-hover:text-yellow-600 transition-colors">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}