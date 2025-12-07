import Link from 'next/link';
import { Instagram, Youtube, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-serif font-bold text-white tracking-widest block">
              AGENCY<span className="text-accent">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              우리는 그림을 가르치지 않습니다.<br />
              합격을 설계합니다.<br />
              미국/영국 명문 미대 입시 전문 컨설팅.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Youtube size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">바로가기</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-accent transition-colors">커리큘럼 안내</Link></li>
              <li><Link href="/portfolio" className="hover:text-accent transition-colors">합격작 갤러리</Link></li>
              <li><Link href="/team" className="hover:text-accent transition-colors">강사진 소개</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">수강료 안내</Link></li>
              <li><Link href="/diagnostics" className="hover:text-accent transition-colors">합격 확률 진단</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span><br/>(방문 상담 예약제)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>010-8818-0403</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>acmestudio25@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Legal / Hours */}
          <div>
            <h4 className="text-white font-bold mb-6">상담 가능 시간</h4>
            <p className="text-sm text-slate-400 mb-6">
              월 - 금: 10:00 AM - 09:00 PM<br/>
              토요일: 10:00 AM - 06:00 PM<br/>
              일요일 및 공휴일 휴무
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
              <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} Agency Name. All rights reserved.</p>
          <p>Designed for Portfolio Consulting.</p>
        </div>
      </div>
    </footer>
  );
}