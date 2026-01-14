import { useLanguage, type Language } from "../i18n";

const languages: { code: Language; flag: string; name: string }[] = [
  { code: "en", flag: "GB", name: "English" },
  { code: "pl", flag: "PL", name: "Polski" },
  { code: "it", flag: "IT", name: "Italiano" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1">
      {languages.map(({ code, flag, name }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            language === code
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-slate-600 hover:bg-gray-200"
          }`}
          title={name}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}
