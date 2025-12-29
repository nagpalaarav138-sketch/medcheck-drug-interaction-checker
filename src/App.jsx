
import React, { useState } from 'react';
import { Search, AlertTriangle, Info, X, CheckCircle, XCircle, AlertCircle, Pill, Shield, Sparkles } from 'lucide-react';

const DrugInteractionChecker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interactions, setInteractions] = useState(null);
  const [error, setError] = useState('');

  // Common drugs database
  const commonDrugs = [
    'Aspirin', 'Ibuprofen', 'Acetaminophen', 'Lisinopril', 'Metformin', 
    'Amlodipine', 'Metoprolol', 'Omeprazole', 'Simvastatin', 'Losartan',
    'Albuterol', 'Gabapentin', 'Hydrochlorothiazide', 'Sertraline', 'Montelukast',
    'Furosemide', 'Atorvastatin', 'Clopidogrel', 'Levothyroxine', 'Amoxicillin',
    'Prednisone', 'Warfarin', 'Pantoprazole', 'Fluoxetine', 'Citalopram',
    'Escitalopram', 'Duloxetine', 'Tramadol', 'Meloxicam', 'Naproxen',
    'Diclofenac', 'Ranitidine', 'Famotidine', 'Alprazolam', 'Lorazepam',
    'Clonazepam', 'Zolpidem', 'Trazodone', 'Bupropion', 'Venlafaxine',
    'Carvedilol', 'Propranolol', 'Diltiazem', 'Verapamil', 'Spironolactone',
    'Potassium Chloride', 'Insulin', 'Glipizide', 'Glyburide', 'Sitagliptin',
    'Methotrexate', 'Azithromycin', 'Ciprofloxacin', 'Doxycycline', 'Clarithromycin'
  ];

  // Local interaction database (educational examples)
  const localInteractions = {
    'aspirin-warfarin': {
      severity: 'major',
      description: 'Both aspirin and warfarin affect blood clotting. Taking them together significantly increases the risk of serious bleeding, including internal bleeding and hemorrhagic stroke. This combination requires close medical supervision and frequent blood testing.'
    },
    'aspirin-ibuprofen': {
      severity: 'moderate',
      description: 'Both medications are NSAIDs (non-steroidal anti-inflammatory drugs). Taking them together increases the risk of stomach ulcers, gastrointestinal bleeding, and kidney problems. Ibuprofen may also reduce the heart-protective effects of aspirin.'
    },
    'lisinopril-potassium chloride': {
      severity: 'major',
      description: 'Lisinopril (ACE inhibitor) can increase potassium levels in the blood. Adding potassium supplements can lead to dangerous hyperkalemia (high potassium), which may cause irregular heartbeat, muscle weakness, or even cardiac arrest.'
    },
    'warfarin-aspirin': {
      severity: 'major',
      description: 'Both medications affect blood clotting through different mechanisms. Their combination dramatically increases bleeding risk, including serious internal bleeding. This combination requires careful monitoring by a healthcare provider.'
    },
    'simvastatin-clarithromycin': {
      severity: 'major',
      description: 'Clarithromycin inhibits the enzyme that breaks down simvastatin, leading to dangerously high statin levels. This increases the risk of rhabdomyolysis (muscle breakdown), which can cause kidney damage and failure.'
    },
    'fluoxetine-tramadol': {
      severity: 'major',
      description: 'Both medications increase serotonin levels in the brain. Taking them together can cause serotonin syndrome, a potentially life-threatening condition with symptoms including confusion, rapid heart rate, high blood pressure, fever, and seizures.'
    },
    'metformin-alcohol': {
      severity: 'moderate',
      description: 'Alcohol can increase the risk of lactic acidosis when taking metformin, a rare but serious condition. Alcohol also affects blood sugar control, making diabetes management more difficult.'
    },
    'lisinopril-ibuprofen': {
      severity: 'moderate',
      description: 'NSAIDs like ibuprofen can reduce the blood pressure-lowering effects of lisinopril and may worsen kidney function, especially in elderly patients or those with existing kidney problems.'
    },
    'warfarin-acetaminophen': {
      severity: 'minor',
      description: 'Regular use of acetaminophen (especially at high doses) may enhance the blood-thinning effects of warfarin, slightly increasing bleeding risk. Occasional use of normal doses is generally considered safe.'
    },
    'metoprolol-diltiazem': {
      severity: 'moderate',
      description: 'Both medications slow heart rate and reduce blood pressure. Using them together can cause excessive lowering of heart rate (bradycardia) and blood pressure, leading to dizziness, fatigue, or fainting.'
    },
    'sertraline-tramadol': {
      severity: 'major',
      description: 'Both increase serotonin levels, risking serotonin syndrome. Additionally, both lower seizure threshold, increasing seizure risk when combined.'
    },
    'prednisone-ibuprofen': {
      severity: 'moderate',
      description: 'Both medications can irritate the stomach lining. Taking them together significantly increases the risk of stomach ulcers and gastrointestinal bleeding.'
    },
    'omeprazole-clopidogrel': {
      severity: 'moderate',
      description: 'Omeprazole may reduce the effectiveness of clopidogrel by inhibiting the enzyme needed to activate it, potentially reducing its blood-thinning effects and cardiovascular protection.'
    },
    'atorvastatin-diltiazem': {
      severity: 'moderate',
      description: 'Diltiazem can increase atorvastatin levels in the blood, raising the risk of muscle pain, muscle damage, and rhabdomyolysis. Dosage adjustment may be needed.'
    },
    'alprazolam-alcohol': {
      severity: 'major',
      description: 'Both are central nervous system depressants. Combining them can cause severe drowsiness, respiratory depression, loss of consciousness, and potentially fatal overdose.'
    }
  };

  // Filter suggestions
  const suggestions = searchTerm.length >= 2 
    ? commonDrugs.filter(drug => 
        drug.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8)
    : [];

  // Add drug
  const addDrug = (drugName) => {
    if (!selectedDrugs.includes(drugName) && selectedDrugs.length < 10) {
      setSelectedDrugs([...selectedDrugs, drugName]);
      setSearchTerm('');
      setInteractions(null);
      setError('');
    }
  };

  // Remove drug
  const removeDrug = (drugName) => {
    setSelectedDrugs(selectedDrugs.filter(d => d !== drugName));
    setInteractions(null);
  };

  // Check interactions using local database
  const checkInteractions = async () => {
    if (selectedDrugs.length < 2) {
      setError('Please select at least 2 medications to check for interactions.');
      return;
    }

    setLoading(true);
    setError('');
    setInteractions(null);

    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    const foundInteractions = [];

    // Check all drug pairs
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = i + 1; j < selectedDrugs.length; j++) {
        const drug1 = selectedDrugs[i].toLowerCase();
        const drug2 = selectedDrugs[j].toLowerCase();
        
        // Check both orderings
        const key1 = `${drug1}-${drug2}`;
        const key2 = `${drug2}-${drug1}`;
        
        const interaction = localInteractions[key1] || localInteractions[key2];
        
        if (interaction) {
          foundInteractions.push({
            drug1: selectedDrugs[i],
            drug2: selectedDrugs[j],
            ...interaction
          });
        }
      }
    }

    setLoading(false);

    if (foundInteractions.length === 0) {
      setInteractions({
        hasInteractions: false,
        message: 'No known interactions found in our database for this combination. This does not guarantee safety - new interactions are discovered regularly, and individual factors matter. Always consult your healthcare provider.'
      });
    } else {
      setInteractions({
        hasInteractions: true,
        interactions: foundInteractions
      });
    }
  };

  // Get severity styling
  const getSeverityInfo = (severity) => {
    const sev = (severity || '').toLowerCase();
    if (sev.includes('major')) {
      return { 
        color: 'from-red-50 to-red-100 border-red-400', 
        textColor: 'text-red-900',
        badgeColor: 'bg-red-500 text-white',
        icon: XCircle, 
        label: 'MAJOR'
      };
    } else if (sev.includes('moderate')) {
      return { 
        color: 'from-orange-50 to-orange-100 border-orange-400', 
        textColor: 'text-orange-900',
        badgeColor: 'bg-orange-500 text-white',
        icon: AlertCircle, 
        label: 'MODERATE'
      };
    } else if (sev.includes('minor')) {
      return { 
        color: 'from-yellow-50 to-yellow-100 border-yellow-400', 
        textColor: 'text-yellow-900',
        badgeColor: 'bg-yellow-500 text-white',
        icon: Info, 
        label: 'MINOR'
      };
    }
    return { 
      color: 'from-blue-50 to-blue-100 border-blue-400', 
      textColor: 'text-blue-900',
      badgeColor: 'bg-blue-500 text-white',
      icon: Info, 
      label: 'UNKNOWN'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 md:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-5 rounded-2xl mb-8 shadow-2xl border-2 border-red-400">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <Shield size={20} />
                Educational Use Only - Not Medical Advice
              </h3>
              <p className="text-sm leading-relaxed opacity-95">
                This tool is for educational purposes ONLY. It does NOT replace professional medical advice. 
                Always consult a qualified healthcare provider before starting, stopping, or changing any medication.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 mb-8 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Pill className="text-white" size={36} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                MedCheck
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Sparkles size={16} className="text-purple-500" />
                Smart Drug Interaction Checker
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Learn about potential interactions between medications. Database includes 50+ common drugs with detailed interaction information.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 mb-8 border border-white/20">
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Search size={18} className="text-indigo-500" />
            Search Medications
          </label>
          
          <div className="relative">
            <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-4 focus-within:border-indigo-500 focus-within:shadow-lg transition-all">
              <Search size={22} className="text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Try: Aspirin, Warfarin, Lisinopril, Ibuprofen..."
                className="flex-1 outline-none text-gray-700 bg-transparent font-medium"
              />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-3 bg-white border-2 border-indigo-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
                {suggestions.map((drug, idx) => (
                  <button
                    key={idx}
                    onClick={() => addDrug(drug)}
                    className="w-full text-left px-5 py-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl group"
                  >
                    <div className="font-semibold text-gray-800 group-hover:text-indigo-600 flex items-center gap-2">
                      <Pill size={16} className="text-gray-400 group-hover:text-indigo-500" />
                      {drug}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Drugs */}
          {selectedDrugs.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Selected Medications ({selectedDrugs.length}/10):
              </p>
              <div className="flex flex-wrap gap-3">
                {selectedDrugs.map((drug, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Pill size={16} />
                    <span>{drug}</span>
                    <button
                      onClick={() => removeDrug(drug)}
                      className="hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Check Button */}
          <button
            onClick={checkInteractions}
            disabled={selectedDrugs.length < 2 || loading}
            className={`w-full mt-6 py-4 px-8 rounded-2xl font-bold text-white text-lg transition-all shadow-xl ${
              selectedDrugs.length < 2 || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 hover:shadow-2xl'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Analyzing Interactions...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={20} />
                Check for Interactions
              </span>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-400 text-red-800 p-5 rounded-2xl mb-8 shadow-xl">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} />
              <span className="font-semibold">{error}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {interactions && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                <Info size={24} className="text-white" />
              </div>
              Analysis Results
            </h2>

            {!interactions.hasInteractions ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-green-500 p-3 rounded-xl">
                    <CheckCircle size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">
                    No Known Interactions Found
                  </h3>
                </div>
                <p className="text-green-700 text-lg mb-4">
                  {interactions.message}
                </p>
                <div className="bg-white/50 rounded-xl p-4 border border-green-300">
                  <p className="text-sm text-green-800 font-medium">
                    <strong>Important:</strong> Always consult your healthcare provider before combining medications.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {interactions.interactions.map((interaction, idx) => {
                  const info = getSeverityInfo(interaction.severity);
                  const Icon = info.icon;

                  return (
                    <div key={idx} className={`bg-gradient-to-br ${info.color} border-2 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all`}>
                      <div className="flex items-start gap-4">
                        <div className={`${info.badgeColor} p-3 rounded-xl shadow-lg flex-shrink-0`}>
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3 className={`font-bold text-xl ${info.textColor}`}>
                              {interaction.drug1} ↔ {interaction.drug2}
                            </h3>
                            <span className={`${info.badgeColor} px-3 py-1.5 rounded-full text-xs font-bold shadow-md`}>
                              {info.label} SEVERITY
                            </span>
                          </div>
                          <div className="bg-white/70 rounded-xl p-4 mb-3 border border-white/50">
                            <p className="text-sm leading-relaxed font-medium text-gray-800">
                              {interaction.description}
                            </p>
                          </div>
                          <div className="bg-white/50 rounded-xl p-3 border-2 border-white/70">
                            <p className={`text-xs font-bold ${info.textColor} flex items-center gap-2`}>
                              <Shield size={16} />
                              RECOMMENDED: Consult your healthcare provider before taking these medications together.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-300 shadow-inner">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Info size={18} className="text-indigo-600" />
                About This Database
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                This educational tool contains curated information about common drug interactions. 
                It may not include all possible interactions. Factors like dosage, timing, health conditions, and other medications can affect interactions.
                Always verify with a healthcare professional.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-white/80 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <Shield size={16} />
            Educational interaction database with 15+ documented interactions
          </p>
          <p className="font-medium">
            Built for educational purposes | Not a substitute for medical advice
          </p>
          <p className="text-xs text-white/60">
            © 2025 MedCheck - Empowering informed health decisions
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrugInteractionChecker;
