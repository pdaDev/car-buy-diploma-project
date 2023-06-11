import React, {FC} from "react";
import {Card, Container, formatPrice, Stack, Symbol, Text} from "shared";
import {useTranslation} from "react-i18next";
import {getPriceRange} from "entities/Car/lib/helpers";
import {NS} from "entities/Car";

interface IProps {
    price: NS.IPriceRange
}

export const PriceInfo: FC<IProps> = ({
                                          price
                                      }) => {
    const {t} = useTranslation()
    if (!price.max && !price.min) {
        return <></>
    }

    const isOnePrice = price.min === price.max
    const label = `advertisement.create.price.${isOnePrice ? 'single' : 'range'}`
    const priceRange = isOnePrice
        ? formatPrice(price.max!)
        : getPriceRange(price)

    return(
    <Stack direction={"row"} hAlign={'end'} size={'container'}>
        <Container p={2} size={'content'} contentAlign={'middle-left'}>
            <Text content={t(label)} weight={'regular'} size={3}/>
        </Container>
        <Card shadow={3} contentAlign={'center'} border={2} height={'100%'} width={'100%'}>
            <Symbol content={priceRange}
                    weight={'medium'}
                    size={5}
                    color={'primary'}
            />
        </Card>
    </Stack>)
}