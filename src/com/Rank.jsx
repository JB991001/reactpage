import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Rank.scss';
import Menu from './Menu';
import shoeData from '../data/Rank-Shoe.json';
import CloData from '../data/Rank-Clo.json';  
import bagData from '../data/Rank-Bag.json'; 
import techData from '../data/Rank-Tech.json'; 
import legoData from '../data/Rank-Lego.json'; 

const Rank = () => {
  const [category, setCategory] = useState('신발');
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataMap = {
    신발: shoeData,
    의류: CloData,
    가방: bagData,
    테크: techData,
    레고: legoData,
  };

  useEffect(() => {
    if (category in dataMap) {
      setRankingData(dataMap[category]);
      setLoading(false);
    } else {
      setRankingData([]);
      setLoading(true);
    }
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setLoading(true);
  };

  return (
    <div className="rank-container">
      <Link to="/" className="home-button">Home</Link>
      <Menu />

      <h2>많이 본 상품</h2>

      <div className="category-buttons">
        {['신발', '의류', '가방', '테크', '레고'].map((cat) => (
          <button
            key={cat}
            className={`category-button ${category === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="ranking-list">
        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : (
          rankingData.length > 0 ? (
            rankingData.map((item, index) => (
              <li key={item.id} className="rank-item-rank">
                <span>{index + 1}위 - {item.name}</span><br />
                <img src={item.img} alt={item.name}
                  className="rank-image"
                />
                <p>가격: {item.price.toLocaleString()} 원</p>
              </li>
            ))
          ) : (
            <p>해당 카테고리에는 데이터가 없습니다.</p>
          )
        )}
      </ul>
    </div>
  );
};

export default Rank;
