// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';  // You can add your styles here

const topics = [
  { id: 'topic1', title: 'RGM CAPABILITIES JOURNEY RGMx', description: '', subtopics: ["RGM ORIENTED COMPANIES INTRODUCTION - VALUE GENERATION", "WHY DATA DRIVEN RGM SOLUTIONS ARE CRITICAL FOR LATAM", "RGMx VISION: OUR PURPOSE AND HORIZONS (FROM DEMOCRATIZE TO GEN AI TOOLS)", "RGMx VISION: PRESENTATION OF SOLUTIONS & HOW THEY CONNECT TO THE BUSINESS AND AMONG THEMSELVES"] },
  { id: 'topic2', title: 'Advanced RGM Strategies', description: 'Master advanced strategies for RGM.', subtopics: [] },
  { id: 'topic3', title: 'Pricing Optimization Tools', description: 'Understand pricing optimization techniques.', subtopics: [] },
  { id: 'topic4', title: 'Assortment Planning', description: 'Learn how to optimize product assortments.', subtopics: [] },
];

const HomePage: React.FC = () => {
  return (
    <div className="container my-1">
      <h1 className="text-center mb-4">Available Topics</h1>
      <div className="row tex-center">
        {topics.map((topic) => (
          <div key={topic.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{topic.title}</h5>
                <p className="card-text">
                  <ul>
                    {
                      topic?.subtopics?.map((item, key) => (
                        <li key={key}>{item}</li>
                      ))
                    }
                  </ul>
                  {topic.description}
                </p>
                <Link to={`/topic/${topic.id}`} className="btn btn-primary">
                  Learn
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
