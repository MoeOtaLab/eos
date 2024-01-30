import { EventEmitter } from '@eos/shared';
import { Action } from '../ModelState/Action';

export interface TrackRecord {
  /** 上报的主体 */
  target: string;
  action: Action;
}

class Tracker extends EventEmitter<TrackRecord> {
  track(trackRecord: TrackRecord) {
    this.emit('track', trackRecord);
  }

  onTrack(callback: (record: TrackRecord) => void) {
    this.on('track', callback);
  }
}

export const tracker = new Tracker();
