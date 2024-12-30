/**
 * ListRecords
 *
 * Class for dividing and handling many listRecords
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { FieldValues } from '../../data';


export class ListRecords {

  constructor(
    private readonly records: FieldValues[],
  ) {
  }

  /**
   * Callback is called by dividing the callback by the specified number of cases
   */
  each(count: number, callback: (records: FieldValues[], pageNumber: number) => void) {
    for (let i = 0, page = 1; i < this.records.length; i += count, page++) {
      callback(this.records.slice(i, i + count), page);
    }
  }

  /**
   * Returns the records of the specified page
   */
  get(count: number, pageNumber: number): FieldValues[] {
    return this.records.slice((pageNumber - 1) * count, pageNumber * count);
  }

}
