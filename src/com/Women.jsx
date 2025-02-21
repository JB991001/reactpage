import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Women.scss';  // 스타일 파일은 별도로 생성해 주세요.
import Menu from './Menu';
import womenData from '../data/Rank-Women.json';  // Women 데이터를 불러오는 경로 (데이터 파일 경로 수정 필요)

const Women = () => {
  const [category, setCategory] = useState('여성');
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rankGroup, setRankGroup] = useState('1-5등'); 

  useEffect(() => {
    if (category === '여성') {
      setRankingData(womenData);
      setLoading(false);
    }
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setLoading(true);
  };

  const handleRankGroupChange = (group) => {
    setRankGroup(group);
  };

  // 순위 구간 나누기
  const getRankGroup = (index) => {
    if (index < 5) return '1-5등';
    if (index < 10) return '6-10등';
    if (index < 15) return '11-15등';
    return '16-20등';
  };

  // 순위 표시할 때 6등부터 10등까지 순서대로 보여주기
  const getAdjustedRank = (index, group) => {
    if (group === '6-10등') {
      return index + 6; 
    }
    if (group === '11-15등') {
      return index + 11; 
    }
    if (group === '16-20등') {
      return index + 16;
    }
    return index + 1;
  };

  // 순위 구간에 맞는 아이템만 필터링
  const getFilteredData = () => {
    switch (rankGroup) {
      case '1-5등':
        return rankingData.slice(0, 5);
      case '6-10등':
        return rankingData.slice(5, 10);
      case '11-15등':
        return rankingData.slice(10, 15);
      case '16-20등':
        return rankingData.slice(15, 20);
      default:
        return rankingData;
    }
  };

  return (
    <div className="rank-container">
      <Link to="/" className="home-button">Home</Link>
      <Menu />

      <h2>이번 주 여성 인기 상품</h2>

      <div className="rank-group-buttons">
        {['1-5등', '6-10등', '11-15등', '16-20등'].map((group) => (
          <button
            key={group}
            className={`rank-group-button ${rankGroup === group ? 'active' : ''}`}
            onClick={() => handleRankGroupChange(group)}
          >
            {group}
          </button>
        ))}
      </div>

      <ul className="ranking-list">
        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : (
          getFilteredData().length > 0 ? (
            getFilteredData().map((item, index) => (
              <li key={item.id} className="rank-item-women">
                <span>{getAdjustedRank(index, rankGroup)}위 - {item.name}</span><br />
                <img src={item.img} alt={item.name} className="rank-image" />
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

export default Women;
