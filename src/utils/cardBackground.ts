import { categoryImages } from '../assets/images/card/card'

// 카드 리스트 카테고리별 랜덤 배경 
export const cardBackground = (category: number, postId: number) => {
    const images = categoryImages[category];

    if (images) {
        const selectedImage = images[Math.floor(postId % images.length)];
        return `url(${selectedImage})`
    }

    return undefined
}