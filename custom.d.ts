type IconItem = {
    id: number;
    href: string;
    name?: string;
    selectIndex: number;
    text: string;
    width?: number;
    height?: number;
    changeIndex: (e: number) => void
}
type FoodItem = {
    x: number;
    y: number;
    background: string;
}
type setDirectionOptions = {
    oldDirection: Direction;
    newDirection: Direction
}
interface DialogOptions {
    title: string;
    ok: () => void;
    cancel: () => void;
}
type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
type ButtonItem = {
    text: string;
    direction: Direction;
}
interface BodyItem {
    x: number;
    y: number;
}
interface PlaceOptions {
    x: number;
    y: number;
    background: string;
}
interface CreatePlace {
    number: number,
    width: number,
    height: number
}
interface GetHeadAndBody {
    width: number,
    height: number;
}
type StarList = {
    id: number;
    transformOrigin: string;
    transform: string;
}[]
type CommentItem = {
    id: number;
    userId: number;
    postId: number;
    content: string;
    user: string;
    post: string,
    createdAt: string;
    updateAt: string;
    nickname: string;
}
type KeyUpEventHash = { [key: string]: (id: number) => number }