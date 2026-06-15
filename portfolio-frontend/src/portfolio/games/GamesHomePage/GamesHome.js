import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './GameHome.css';

function GamesHome() {
  const { t } = useTranslation();

  const games = [
    {
      id: 'wizardarena',
      title: t('GamesHome.gamesHomeCardWizardTitle'),
      path: '/WizardArena3D',
      description: t('GamesHome.gamesHomeCardWizardDescription'),
      tags: [
        t('GamesHome.gamesHomeTagUnity'),
        t('GamesHome.gamesHomeTagCSharp'),
        t('GamesHome.gamesHomeTagWebGL'),
        t('GamesHome.gamesHomeTag3DGameDev'),
      ],
    },
    {
      id: 'minesweeper',
      title: t('GamesHome.gamesHomeCardMinesweeperTitle'),
      path: '/Minesweeper',
      description: t('GamesHome.gamesHomeCardMinesweeperDescription'),
      tags: [
        t('GamesHome.gamesHomeTagReact'),
        t('GamesHome.gamesHomeTagStateManagement'),
        t('GamesHome.gamesHomeTagGameLogic'),
      ],
    },
    {
      id: 'snake',
      title: t('GamesHome.gamesHomeCardSnakeTitle'),
      path: '/Snake',
      description: t('GamesHome.gamesHomeCardSnakeDescription'),
      tags: [
        t('GamesHome.gamesHomeTagCanvasMovement'),
        t('GamesHome.gamesHomeTagCollisionDetection'),
      ],
    },
  ];

  return (
    <div className="games-page">
      <section className="games-header">
        <h1 className="games-title">{t('GamesHome.gamesHomeTitle')}</h1>
        <p className="games-subtitle">{t('GamesHome.gamesHomeSubtitle')}</p>
      </section>

      <section className="games-grid">
        {games.map((game) => (
          <article key={game.id} className="game-card">
            <div className="game-card-header">
              <h2 className="game-card-title">{game.title}</h2>
              <span className="game-card-pill">
                {t('GamesHome.gamesHomeCardPersonalSandbox')}
              </span>
            </div>

            <p className="game-card-description">{game.description}</p>

            {game.tags && (
              <div className="game-card-tags">
                {game.tags.map((tag, index) => (
                  <span key={index} className="game-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="game-card-actions">
              <Link to={game.path} className="game-card-button">
                {t('GamesHome.gamesHomeCardOpenGame')}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default GamesHome;
