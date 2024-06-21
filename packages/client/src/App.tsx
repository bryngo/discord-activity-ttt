import { AuthenticatedContextProvider } from '@hooks/useAuthenticatedContext';
import { PlayersContextProvider } from '@hooks/usePlayers';
import { GameBoardContextProvider } from '@hooks/useTicTacToe';

import { VoiceChannelActivity } from '@components/VoiceChannelActivity';
export default function App() {
  return (
    <AuthenticatedContextProvider>
      <PlayersContextProvider>
        <GameBoardContextProvider>
          <VoiceChannelActivity />
        </GameBoardContextProvider>
      </PlayersContextProvider>
    </AuthenticatedContextProvider>
  );
}
