import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DisclaimerBanner: React.FC = () => {
  const { language } = useLanguage();

  const isTelugu = language === 'te';

  return (
    <div className="my-4 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 text-amber-950 shadow-md">
      <div className="flex items-start gap-3.5">
        <div className="rounded-lg bg-amber-100 p-2 text-amber-700 flex-shrink-0 border border-amber-300">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="text-xs leading-relaxed font-semibold">
          <span className="font-black text-amber-950 uppercase tracking-wide block sm:inline">
            {isTelugu ? 'తప్పనిసరి వైద్య నిరాకరణ: ' : 'Mandatory Medical Disclaimer: '}
          </span>
          <span className="text-amber-900 font-bold">
            {isTelugu
              ? 'AI-ఆధారిత రిస్క్ అంచనా కేవలం ప్రజారోగ్య పర్యవేక్షణ మరియు నిర్ణయాల మద్దతు కోసమే. ఇది వైద్య నిర్ధారణ కాదు.'
              : 'AI-generated risk assessment is intended for public-health monitoring and decision support. It is not a medical diagnosis.'}
          </span>
        </div>
      </div>
    </div>
  );
};
