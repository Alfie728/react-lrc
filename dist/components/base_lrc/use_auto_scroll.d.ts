import { KeyboardEvent } from 'react';
import { Props } from './constants';
import { BaseLine } from '../../constants';
/**
 * detect user scroll
 * 1. wheel
 * 2. keyboard
 * 3. drag scrollbar
 * @author mebtte<i@mebtte.com>
 */
declare const _default: ({ recoverAutoScrollInterval, recoverAutoScrollSingal, onAutoScrollChange, }: {
    recoverAutoScrollInterval: number;
    recoverAutoScrollSingal: boolean;
    onAutoScrollChange: Props<BaseLine>['onAutoScrollChange'];
}) => {
    autoScroll: boolean;
    onWheel: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    onPointerDown: () => void;
    onPointerUp: () => void;
    onPointerMove: () => void;
};
export default _default;
