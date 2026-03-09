import { useParams } from 'react-router-dom';
import { GAME_PATHS } from '../lib/constants';
import { LolSearchResultsPage } from './lol/LolSearchResultsPage';
import { ErSearchResultsPage } from './er/ErSearchResultsPage';

export function SearchResultsPage() {
  const { game } = useParams<{ game: string }>();

  if (game === GAME_PATHS.LOL) return <LolSearchResultsPage />;
  if (game === GAME_PATHS.ETERNAL_RETURN) return <ErSearchResultsPage />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 dark:text-slate-400">
      <p className="text-lg font-medium">지원하지 않는 게임입니다.</p>
      <p className="text-sm mt-1">Coming soon!</p>
    </div>
  );
}
