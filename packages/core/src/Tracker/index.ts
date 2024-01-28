import { EventEmitter } from '../EventEmitter';
import { type ExtraInfo } from '../ModelState/ExtraInfo';

export interface TrackRecord {
  /** 上报的主体 */
  target: string;
  extraInfo: ExtraInfo;
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
