import { useState } from 'react';
import './App.css';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });
  const [result, setResult] = useState({ years: '--', months: '--', days: '--' });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { day: '', month: '', year: '' };

    if (!day) {
      newErrors.day = 'This field is required';
      valid = false;
    } else if (day < 1 || day > 31) {
      newErrors.day = 'Must be a valid day';
      valid = false;
    }

    if (!month) {
      newErrors.month = 'This field is required';
      valid = false;
    } else if (month < 1 || month > 12) {
      newErrors.month = 'Must be a valid month';
      valid = false;
    }

    if (!year) {
      newErrors.year = 'This field is required';
      valid = false;
    } else if (year > new Date().getFullYear()) {
      newErrors.year = 'Must be a less year';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const calculateAge = () => {
    if (!validateInputs()) return;

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += lastDayOfPreviousMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  const handleInputFocus = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="app">
      <div className="backbox backbox-position backbox-margins">
        <form onSubmit={(e) => {
          e.preventDefault();
          calculateAge();
        }}>
          <div className="container-form">
            <label htmlFor="day" className={errors.day ? 'labelRequired' : ''}>DAY</label>
            <input
              className={`input ${errors.day ? 'inputRequired' : ''}`}
              id="day"
              type="number"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onFocus={() => handleInputFocus('day')}
            />
            {errors.day && <p className="required">{errors.day}</p>}
          </div>
          <div className="container-form">
            <label htmlFor="month" className={errors.month ? 'labelRequired' : ''}>MONTH</label>
            <input
              className={`input ${errors.month ? 'inputRequired' : ''}`}
              id="month"
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onFocus={() => handleInputFocus('month')}
            />
            {errors.month && <p className="required">{errors.month}</p>}
          </div>
          <div className="container-form">
            <label htmlFor="year" className={errors.year ? 'labelRequired' : ''}>YEAR</label>
            <input
              className={`input ${errors.year ? 'inputRequired' : ''}`}
              id="year"
              type="number"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onFocus={() => handleInputFocus('year')}
            />
            {errors.year && <p className="required">{errors.year}</p>}
          </div>
        </form>
        <div className="separation">
          <div className="linha"></div>
          <button id="button_gen" onClick={calculateAge}>
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
              <g fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
              </g>
            </svg>
          </button>
        </div>
        <div className="results">
          <p id="years"><span className="color-purple"><strong>{result.years}</strong></span><span className="text">years</span></p>
          <p id="months"><span className="color-purple"><strong>{result.months}</strong></span><span className="text">months</span></p>
          <p id="days"><span className="color-purple"><strong>{result.days}</strong></span><span className="text">days</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;