import * as React from "react";
export interface OnPageChangeProps {
    page: number;
    totalPage: number;
}
interface Props {
    data: Array<any>;
    pageSize: number;
    renderItem: Function;
    onPageChange: ({ page }: OnPageChangeProps) => any;
}
declare const Main: React.FC<Props>;
export default Main;
