import { Award, GraduationCap, BookOpen } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: '송 현 석',
      role: 'Head Director',
      education: 'Boston University Fine Arts (Magna Cum Laude)',
      desc: '단순한 입시 지도가 아닌, 작가로서의 정체성을 찾아주는 멘토링을 지향합니다. 지난 10년간 RISD, Yale, RCA 등 Top-Tier 합격생을 다수 배출했습니다.',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
      tags: ['포트폴리오 총괄', '전략 컨설팅'],
    },
    {
      name: 'Sarah Lee',
      role: 'Senior Mentor',
      education: 'RISD (Rhode Island School of Design) BFA',
      desc: '입학 사정관이 원하는 것이 무엇인지 정확히 파악하고 있습니다. 학생의 장점을 극대화하는 시각적 스토리텔링을 지도합니다.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      tags: ['Design Process', 'Installation'],
    },
    {
      name: 'James Kim',
      role: 'Digital Specialist',
      education: 'RCA (Royal College of Art) MA',
      desc: '현대 미술에서 필수적인 디지털 툴과 미디어 아트를 지도합니다. 영상 에세이와 디지털 아카이빙 제작을 전담합니다.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
      tags: ['Media Art', 'Video Essay'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="container mx-auto px-6">
        {/* Intro */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-6">
            Expert Team
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            우리는 미술·디자인 교육과 실무를 연결하는 팀입니다.
            <br />
            대학 입시 지도, 전시 기획, 포트폴리오 디자인까지 경험이 있는
            전문가가 직접 지도합니다.
          </p>
        </div>

        {/* Director Highlight */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-16 border border-slate-100">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative h-96 md:h-auto">
              <img
                src={teamMembers[0].image}
                alt={teamMembers[0].name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Director
                </span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">
                {teamMembers[0].name}
              </h2>
              <p className="text-yellow-600 font-medium mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                {teamMembers[0].education}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                "{teamMembers[0].desc}"
              </p>
              <div className="flex gap-2">
                {teamMembers[0].tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Other Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.slice(1).map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-2/5 h-64 sm:h-auto relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-3/5 p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{member.role}</p>
                  <p className="text-xs text-yellow-600 font-bold mb-4 flex items-center gap-1">
                    <Award className="w-4 h-4" /> {member.education}
                  </p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3">
                    {member.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {member.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-slate-50 text-slate-500 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
