import type { CommandResponse } from '@discord/embedded-app-sdk';
import { Client, Room } from 'colyseus.js';
import { ITicTacToeState } from '../../server/src/entities/TicTacToeState';

export interface IColyseus {
  room: Room<ITicTacToeState>;
  client: Client;
}
export type TAuthenticatedContext = CommandResponse<'authenticate'> & {
  guildMember: IGuildsMembersRead | null;
} & IColyseus;

export interface IGuildsMembersRead {
  roles: string[];
  nick: string | null;
  avatar: string | null;
  premium_since: string | null;
  joined_at: string;
  is_pending: boolean;
  pending: boolean;
  communication_disabled_until: string | null;
  user: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
  };
  mute: boolean;
  deaf: boolean;
}
