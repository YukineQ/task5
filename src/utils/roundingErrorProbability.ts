import { Faker } from '@faker-js/faker';

const roundingErrorProbability = (errors: number, faker: Faker) => {
    const fractional = errors % 1;
    const intPart = Math.floor(errors);
    const enlargedErrorsCount = faker.helpers.maybe(() => intPart + 1, {
        probability: fractional
    });
    return enlargedErrorsCount || intPart;
};

export default roundingErrorProbability;
