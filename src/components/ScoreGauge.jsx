import React from 'react';

export default function ScoreGauge({ score = 0, title = 'SEO Score', size = 160, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = '#10B981'; // Green
  let bgGlow = 'rgba(16, 185, 129, 0.15)';
  let gradeText = 'Excellent';
  let gradeColor = 'text-emerald-400';

  if (score < 50) {
    colorClass = '#EF4444'; // Red
    bgGlow = 'rgba(239, 68, 68, 0.15)';
    gradeText = 'Needs Work';
    gradeColor = 'text-red-400';
  } else if (score < 80) {
    colorClass = '#F59E0B'; // Amber
    bgGlow = 'rgba(245, 158, 11, 0.15)';
    gradeText = 'Moderate';
    gradeColor = 'text-amber-400';
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div 
        className="relative flex items-center justify-center rounded-full p-2 transition-all duration-700"
        style={{ boxShadow: `0 0 30px ${bgGlow}` }}
      >
        <svg width={size} height={size} className="score-circle-svg">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1F293D"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorClass}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Inner Counter Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-white font-['Outfit']">
            {score}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
            / 100
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
        <span className={`text-xs font-medium ${gradeColor}`}>{gradeText}</span>
      </div>
    </div>
  );
}
