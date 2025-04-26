import React from 'react';

const FAQ = () => {
  const questions = [
    {
      question: "What is this blog about?",
      answer: "This blog explores theological topics, daily biblical passages, and community discussions around faith."
    },
    {
      question: "How can I post a question?",
      answer: "You'll need to register an account and log in to submit questions or comments."
    },
    {
      question: "Who moderates the discussions?",
      answer: "Community moderators review posts for respectful and constructive dialogue."
    }
  ];

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <ul>
        {questions.map((q, idx) => (
          <li key={idx}>
            <strong>{q.question}</strong>
            <p>{q.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
