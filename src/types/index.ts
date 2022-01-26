
export interface IReview {
	id:number,
	email: string,
	text: string,
	isPositively: boolean
}
export interface IGame{
	image:string;
	title:string;
	genres:Array<string>;
	price:number;
	video:string;
	id:number
	description:string;
}
export interface IMessage{
	text:string,
	userId:string
}