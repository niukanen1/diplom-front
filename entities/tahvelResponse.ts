import { absence } from './absence';
import { mark } from './mark';
import { task } from './task';
import { fullPersonInfo } from './fullPersonInfo';
export interface tahvelResponse {
    marks : mark[],
    absences : absence[],
    tasks : task[]
    fullPersonInfo : fullPersonInfo
}