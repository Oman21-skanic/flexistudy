import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../App';
import { getQuizById } from '../data/mockQuizData';
import QuizComponent from '../components/QuizComponent';
import { api } from '../lib/apiClient';

export default function QuizPage() {
  const { moduleId, subId } = useParams();
  const navigate = useNavigate();
  const { user, modules, refreshUserData } = useApp();

  let questions = [];
  let subTitle = subId;

  // Find in dynamic modules from context
  const mod = (modules || []).find(m => m.id === moduleId);
  const dynamicSub = mod?.dynamicSubModules?.find(s => s.id === subId);
  
  if (dynamicSub) {
    questions = dynamicSub.questions || [];
    subTitle = dynamicSub.title;
  } else {
    // Fallback to static data
    questions = getQuizById(subId);
  }

  const handleComplete = async (result) => {
    if (!user) return;

    try {
        await api.saveQuizAttempt({
          email: user.email,
          moduleId: moduleId,
          quizId: subId,
          score: result.score,
          total: result.total,
          percentage: Math.round((result.score / result.total) * 100),
          answers: result.answers || [],
        });
        await refreshUserData();
        alert(`Kuis selesai! Skor: ${result.score}/${result.total}`);
    } catch (err) {
        console.error("Failed to save quiz attempt:", err);
    }

    navigate(`/module/${moduleId}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <button className="btn-back-top" onClick={() => navigate(-1)}>← Kembali</button>
      <h2 style={{ marginTop: 12 }}>{subTitle}</h2>
      <QuizComponent 
        questions={questions} 
        onComplete={handleComplete} 
        moduleTitle={mod?.title || moduleId} 
        submoduleTitle={subTitle} 
      />
    </div>
  );
}
