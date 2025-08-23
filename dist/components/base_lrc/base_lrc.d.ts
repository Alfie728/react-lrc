import { HtmlHTMLAttributes, ForwardedRef } from 'react';
import { Props } from './constants';
import { BaseLine } from '../../constants';
declare function BaseLrc<Line extends BaseLine>({ lines, lineRenderer, currentMillisecond, verticalSpace, recoverAutoScrollInterval, recoverAutoScrollSingal, onLineClick, onAutoScrollChange, onWheel, onKeyDown, onPointerDown, onPointerUp, onPointerMove, ...props }: Props<Line> & HtmlHTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>): JSX.Element;
declare const _default: <Line extends BaseLine>(props: Props<Line> & HtmlHTMLAttributes<HTMLDivElement> & {
    ref: React.ForwardedRef<HTMLDivElement>;
}) => ReturnType<typeof BaseLrc>;
export default _default;
