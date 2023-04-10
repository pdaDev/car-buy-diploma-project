import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ImageSlider} from "./ImageSlider";
import {NumberCounter} from "../NumberCounter/NumberCounter";
import {Counter} from "../Counter/Counter";
import {current} from "@reduxjs/toolkit";

export default {
    name: 'ImageSlider',
    component: ImageSlider as ComponentMeta<typeof ImageSlider>
}

export const Base: ComponentStory<typeof ImageSlider> = (args) => <div style={{width: 500, height: 350}}>
    <ImageSlider {...args} />
</div>


const lineCounter = (current: number, total: number) => <Counter total={total} current={current}/>
const numberCounter = (current: number, total: number) => <NumberCounter total={total} current={current}/>



Base.args = {
    images: [
        'https://i.trse.ru/2018/11/30b8b9a9554e6e763c7cfcbadfa7a9e6.jpg',
        'https://kuznitsaspb.ru/wp-content/uploads/6/3/e/63e69cf6a03b2922ba6473c6059ef3e1.jpeg',
        'https://carsweek.ru/upload/uf/2b9/2b90865ed370edc30d410e41c8f59e00.jpg',
        'https://1gai.ru/uploads/posts/2015-05/1432580276_16.jpg',
        'https://i.trse.ru/2018/10/c4ca4238a0b923820dcc509a6f75849b-13.jpg',
        'https://kuznitsaspb.ru/wp-content/uploads/6/b/6/6b67dcc5fcf14751abb44d54e0fb8e78.jpeg',
        'https://img3.akspic.ru/attachments/originals/7/4/6/5/35647-bmw-lichnyj_roskoshnyj_avtomobil-sportivnyj_avtomobil-sportkar-predstavitelskij_avtomobil-3000x2000.jpg',
    ],
    infinite: true,
    counter: {
        render: numberCounter,
        position: 'bottom-right'
    }
}
