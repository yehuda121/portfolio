import './i18n';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./portfolio/pages/HomePage/HomePage', () => () => <div>Home Page</div>);
jest.mock('./portfolio/games/GamesHomePage/GamesHome', () => () => <div>Games Home</div>);
jest.mock('./portfolio/games/Minesweeper/Minesweeper', () => () => <div>Minesweeper</div>);
jest.mock('./portfolio/games/Snake/Snake', () => () => <div>Snake</div>);
jest.mock('./portfolio/games/WizardArena/WizardArenaGame', () => () => <div>Wizard Arena</div>);
jest.mock('./portfolio/tools/ToolsHome/ToolsHome', () => () => <div>Tools Home</div>);
jest.mock('./portfolio/tools/jpg-to-pdf/JpgToPdf', () => () => <div>Jpg To Pdf</div>);
jest.mock('./portfolio/tools/pdf-merge/PdfMerge', () => () => <div>Pdf Merge</div>);
jest.mock('./portfolio/tools/Quiz/QuizPage', () => () => <div>Quiz Page</div>);

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText(/Tools/i)).toBeInTheDocument();
  expect(screen.getByText(/Games/i)).toBeInTheDocument();
});
