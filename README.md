# 💊 MedCheck - Drug Interaction Checker

> An educational tool designed to help students and the general public learn about potential drug interactions. Built with React, Tailwind CSS, and curated medical data.

![MedCheck Demo](https://img.shields.io/badge/Status-Live-success) ![React](https://img.shields.io/badge/React-18-blue) ![License](https://img.shields.io/badge/License-MIT-green)

[🔗 Live Demo](#) | [📖 Documentation](#features) | [🤝 Contributing](#contributing)

---

## ⚠️ **DISCLAIMER**

**This tool is for EDUCATIONAL PURPOSES ONLY.**  
It does NOT replace professional medical advice, diagnosis, or treatment.  
Always consult a qualified healthcare provider before starting, stopping, or changing any medication.

---

## 🎯 **Project Goals**

- Provide accessible drug interaction information for educational purposes
- Demonstrate ethical healthcare software development
- Help patients ask better questions during medical consultations
- Showcase full-stack development skills for biomedical engineering applications

---

## ✨ **Features**

### Core Functionality
- 🔍 **Smart Search**: Autocomplete with 50+ common medications
- ⚡ **Instant Results**: Offline-first database for reliability
- 🎨 **Severity Classification**: Color-coded warnings (Major/Moderate/Minor)
- 📝 **Detailed Explanations**: Learn WHY interactions occur, not just that they do
- 🛡️ **Safety First**: Prominent disclaimers and educational focus

### Technical Highlights
- **React 18** with modern hooks (useState, useEffect)
- **Tailwind CSS** for responsive, accessible design
- **Curated Database**: 15+ medically verified drug interactions
- **Error Handling**: Graceful fallbacks and user-friendly messages
- **Zero Dependencies**: No external APIs required (works offline)

---

## 🏥 **Supported Interactions**

The database includes interactions for common medications including:
- **NSAIDs** (Aspirin, Ibuprofen, Naproxen)
- **Blood Thinners** (Warfarin, Clopidogrel)
- **Blood Pressure Meds** (Lisinopril, Metoprolol, Amlodipine)
- **Antidepressants** (Fluoxetine, Sertraline, Duloxetine)
- **Statins** (Simvastatin, Atorvastatin)
- And 40+ more commonly prescribed medications

---

## 🚀 **Getting Started**

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/nagpalaarav138-sketch/medcheck-drug-interaction-checker.git

# Navigate to project directory
cd medcheck-drug-interaction-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🛠️ **Built With**

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Source**: Curated educational database (based on DrugBank, RxNorm, FDA data)

---

## 📊 **Project Structure**
```
medcheck-drug-interaction-checker/
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind imports
├── public/                  # Static assets
├── package.json             # Dependencies
└── README.md               # You are here
```

---

## 🔬 **Methodology & Data Accuracy**

### Data Sources
- Drug names and categories: **RxNorm (NLM)**
- Interaction data: **DrugBank, FDA resources**
- Clinical descriptions: Curated from peer-reviewed sources

### Limitations
This educational tool:
- Does NOT account for individual patient factors (age, weight, conditions)
- May not include all possible interactions
- Should NOT be used for medical decision-making
- Reflects data available as of 2025

---

## 🎓 **Educational Use Cases**

Perfect for:
- **Pre-med students** learning pharmacology
- **Nursing students** studying medication safety
- **Pharmacy students** understanding drug interactions
- **Patients** preparing questions for their doctors
- **General public** learning about their medications

---

## 🤝 **Contributing**

Contributions are welcome! If you'd like to add more drug interactions or improve the UI:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-interaction`)
3. Commit your changes (`git commit -m 'Add interaction: Drug X + Drug Y'`)
4. Push to branch (`git push origin feature/new-interaction`)
5. Open a Pull Request

**Please ensure any medical information added is properly sourced.**

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Medical information is for educational purposes and does not constitute medical advice.

---

## 👨‍💻 **About the Developer**

Built by **Aarav Nagpal** - Biomedical Engineering student passionate about healthcare technology and accessible medical information.

This project demonstrates:
- Full-stack web development skills
- Understanding of healthcare data systems
- Ethical considerations in medical software
- User-centered design for health applications

**Connect with me:**
- 🔗 [LinkedIn](https://www.linkedin.com/in/aarav-nagpal-07ba45302)
- 📧 [Email](mailto:nagpalaarav138@gmail.com)
- 💻 [GitHub](https://github.com/nagpalaarav138-sketch)

---

## 🙏 **Acknowledgments**

- **National Library of Medicine (NLM)** for RxNorm data standards
- **DrugBank** for comprehensive drug interaction information
- **FDA** for medication safety resources
- Inspiration from real-world pharmacy interaction checkers

---

## 📮 **Feedback**

Found a bug? Have a suggestion? 

- Open an [Issue](https://github.com/nagpalaarav138-sketch/medcheck-drug-interaction-checker/issues)
- Email me at nagpalaarav138@gmail.com

---

**⚕️ Remember: This tool is educational. Always consult healthcare professionals for medical advice.**

---

*Built with ❤️ for healthcare education*
