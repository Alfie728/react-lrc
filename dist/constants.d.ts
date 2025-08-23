import { ReactNode } from 'react';
export interface BaseLine {
    id: string;
    startMillisecond: number;
}
export interface BaseProps<Line extends BaseLine> {
    lineRenderer: (payload: {
        index: number;
        active: boolean;
        line: Line;
    }) => ReactNode;
    currentMillisecond?: number;
    verticalSpace?: boolean;
    recoverAutoScrollInterval?: number;
    recoverAutoScrollSingal?: boolean;
    onLineClick?: (payload: {
        line: Line | null;
    }) => void;
    onAutoScrollChange?: (payload: {
        autoScroll: boolean;
    }) => void;
}
export declare const DEFAULT_PROPS: {
    readonly currentMillisecond: -1;
    readonly verticalSpace: false;
    readonly recoverAutoScrollInterval: 5000;
    readonly recoverAutoScrollSingal: false;
};
