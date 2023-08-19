import { Faker } from '@faker-js/faker';

const mistakesFunctions = {
    removeCharacter: (str: string, faker: Faker) => {
        if (str.length < 2) return str
        const index = faker.number.int({ max: str.length - 1 });
        return str.slice(0, index) + str.slice(index + 1);
    },
    addRandomCharacter: (str: string, faker: Faker) => {
        const index = faker.number.int({ max: str.length - 1 });
        const randomChar = faker.string.alphanumeric();
        return str.slice(0, index) + randomChar + str.slice(index);
    },
    swapCharactes: (str: string, faker: Faker) => {
        if (str.length < 2) return str
        const firstCharIndex = faker.number.int({ max: str.length - 1 });
        const secondCharIndex = firstCharIndex + 1;
        const swaped = str[secondCharIndex] + str[firstCharIndex];
        return str.slice(0, firstCharIndex) + swaped + str.slice(secondCharIndex + 1);
    }
};

export default mistakesFunctions;
