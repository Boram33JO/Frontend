import { categoryImages } from '../assets/images/main_card/main_card'
import { miniCategoryImages } from '../assets/images/mini_card/mini_card'

// 카드 리스트 카테고리별 랜덤 배경 
export const cardBackground = (category: number, postId: number) => {
    const images = categoryImages[category];

    if (images) {
        const selectedImage = images[postId % images.length];
        return `url(${selectedImage})`
    }

    return undefined
}

export const miniCardBackground = (category: number, postId: number) => {
    const images = miniCategoryImages[category];

    if (images) {
        const selectedImage = images[postId % images.length];
        return `url(${selectedImage})`
    }

    return undefined
}