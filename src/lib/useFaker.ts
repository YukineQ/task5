import { Faker, en, fr, ru } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { omitProperties } from '../utils/omitProperties';
import mistakesFunctions from 'utils/mistakes';
import roundingErrorProbability from 'utils/roundingErrorProbability';

export type Person = {
    num: string;
    id: string;
    fullname: string;
    adress: string;
    phone: string;
};

export const locates = {
    en: en,
    ru: ru,
    fr: fr
};

export type AvailableLocates = keyof typeof locates;

const useFaker = () => {
    const [region, setRegion] = useState<AvailableLocates>('en');
    const [faker, setFaker] = useState(new Faker({ locale: locates[region] }));
    const [seed, setSeed] = useState(0);
    const [mistake, setMistake] = useState(0);
    const [data, setData] = useState<Person[]>([]);
    let currentId = data.length;

    useEffect(() => {
        const generateDataAfterUpdate = () => {
            faker.seed(seed);
            setData([]);
            currentId = 0;
            generateUsers(20);
        };
        generateDataAfterUpdate();
    }, [faker, seed, mistake]);

    const changeLocale = (locale: AvailableLocates) => {
        setRegion(locale);
        setFaker(new Faker({ locale: locates[locale] }));
    };

    const generateRandomUser = () => {
        return {
            id: faker.string.uuid(),
            fullname: faker.person.fullName(),
            adress: generateAdress(),
            phone: faker.phone.number()
        };
    };

    const generateAdress = () => {
        const variants = [faker.location.state(), faker.location.city()];
        return faker.helpers.arrayElement(variants) + ' ' + faker.location.streetAddress();
    };

    const generateUsers = (amount: number = 10): void => {
        const generatedData = Array.from(Array(amount), (_, index) => ({
            num: String(index + currentId + 1),
            ...generateRandomUser()
        }));
        const spoiledData = spoilData(generatedData);
        setData((prev) => prev.concat(spoiledData));
    };

    const spoilData = (data: Person[]): Person[] => {
        if (mistake === 0) return data;

        return data.map((person) => {
            const omittedPerson = omitProperties(person, ['id', 'num', 'phone']);
            let spoiledPerson = { ...person };

            const mistakesCount = roundingErrorProbability(mistake, faker);
            for (let index = 0; index < mistakesCount; index++) {
                const randomField = faker.helpers.objectEntry(omittedPerson);
                const func = faker.helpers.objectValue(mistakesFunctions);
                omittedPerson[randomField[0]] = func(randomField[1], faker);
                spoiledPerson = { ...person, ...omittedPerson };
            }
            return spoiledPerson;
        });
    };

    return {
        data,
        seed,
        setSeed,
        setMistake,
        changeLocale,
        generateUsers,
        region,
        mistake
    };
};

export default useFaker;
