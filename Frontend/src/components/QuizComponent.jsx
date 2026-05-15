import { useState, useEffect } from 'react';
import { useApp } from '../App';
import '../styles/quiz.css';

export function QuizComponent({ questions = [], onComplete, moduleTitle = '', submoduleTitle = '' }) {
  const { speak } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [answers, setAnswers] = useState([]);

  if (!questions || questions.length === 0) {
    return <div className="quiz-empty">Tidak ada soal yang tersedia.</div>;
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const optionLabels = ['A', 'B', 'C', 'D'];

  const handleSelectAnswer = (option) => {
    if (answered) return; // Prevent changing answer after submission
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      speak('Pilih jawaban terlebih dahulu');
      return;
    }

    setAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const correctOptionIndex = optionLabels.indexOf(currentQuestion.correct);
    const correctText = currentQuestion.options[correctOptionIndex];
    setFeedback(isCorrect ? '✓ Benar!' : `✗ Salah. Jawaban yang benar adalah ${currentQuestion.correct}: ${correctText}`);

    const newAnswer = {
      question: currentQuestion.question,
      selected: selectedAnswer,
      correct: currentQuestion.correct,
      isCorrect,
    };
    
    setAnswers([...answers, newAnswer]);

    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (onComplete) {
        // Recalculate everything from the state to be sure
        const finalScore = answers.reduce((acc, curr) => acc + (curr.isCorrect ? 1 : 0), 0);
        onComplete({ score: finalScore, total: questions.length, answers });
      }
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setFeedback('');
  };

  const handleSpeakQuestion = () => {
    // Speak question and then each option (A/B/C/D)
    try {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();

        const utterances = [];
        // question
        utterances.push(new SpeechSynthesisUtterance(currentQuestion.question));

        // options
        const optionLabels = ['A', 'B', 'C', 'D'];
        currentQuestion.options.forEach((opt, idx) => {
          const text = `Pilihan ${optionLabels[idx]}: ${opt}`;
          utterances.push(new SpeechSynthesisUtterance(text));
        });

        utterances.forEach((u) => {
          u.lang = 'id-ID';
          u.rate = 0.95;
          window.speechSynthesis.speak(u);
        });
        return;
      }
    } catch (e) {}

    // Fallback: use app speak once for question
    try { speak(currentQuestion.question, { rate: 0.95 }); } catch (e) {}
  };

  const getOptionText = (index) => currentQuestion.options[index];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-breadcrumb">
          {moduleTitle && <span>{moduleTitle}</span>}
          {submoduleTitle && <span> / {submoduleTitle}</span>}
        </div>
        <div className="quiz-progress">
          Soal {currentIndex + 1} dari {questions.length}
        </div>
      </div>

      <div className="quiz-content">
        <div className="quiz-question-section">
          <div className="quiz-question">
            <h2>{currentQuestion.question}</h2>
            <button className="btn-speak" onClick={handleSpeakQuestion} title="Dengarkan soal">
              🔊 Dengarkan
            </button>
          </div>

          <div className="quiz-options">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`quiz-option ${selectedAnswer === optionLabels[index] ? 'selected' : ''} ${
                  answered ? (optionLabels[index] === currentQuestion.correct ? 'correct' : '') : ''
                } ${answered && selectedAnswer === optionLabels[index] && optionLabels[index] !== currentQuestion.correct ? 'incorrect' : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={optionLabels[index]}
                  checked={selectedAnswer === optionLabels[index]}
                  onChange={() => handleSelectAnswer(optionLabels[index])}
                  disabled={answered}
                />
                <span className="option-label">{optionLabels[index]}</span>
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>

          {feedback && (
            <div className={`quiz-feedback ${feedback.includes('Benar') ? 'success' : 'error'}`}>
              {feedback}
            </div>
          )}

          {answered && currentQuestion.explanation && (
            <div className="quiz-explanation">
              <strong>Penjelasan:</strong> {currentQuestion.explanation}
            </div>
          )}
        </div>

        <div className="quiz-actions">
          {!answered ? (
            <button className="btn btn-primary" onClick={handleSubmitAnswer}>
              Jawab
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>
              {isLastQuestion ? 'Selesai' : 'Soal Berikutnya'}
            </button>
          )}
        </div>

        <div className="quiz-score">
          Benar: <span>{score}</span> / {questions.length}
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;
