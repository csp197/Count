import { useEffect, useState } from 'react';

const ReadingProgress = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const element = document.documentElement;
    const scrollTop = element.scrollTop || document.body.scrollTop;
    const scrollHeight = element.scrollHeight || document.body.scrollHeight;
    const clientHeight = element.clientHeight;
    
    // Calculate scroll percentage
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    return Math.min(scrollPercentage, 100);
  };

  const handleScroll = () => {
    const progress = scrollHeight();
    setWidth(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ReadingProgress; 