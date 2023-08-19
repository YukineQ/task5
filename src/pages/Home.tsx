import useFaker, { AvailableLocates, Person } from 'lib/useFaker';
import { Table } from 'components/Table';
import useInfinitScroll from 'lib/useInfinitScroll';
import { ToggleGroup } from 'components/ToggleGroup';
import { Range } from 'components/Range/Range';
import { NumberInput } from 'components/NumberInput/NumberInput';
import { CSVLink } from 'react-csv';
import { Button } from 'components/Button/Button';
import { BsFiletypeCsv } from 'react-icons/bs';
import { useDarkMode } from 'lib/useDarkMode';
import { MdDarkMode } from 'react-icons/md';

const LocaleToggle = ({
    changeLocale,
    region
}: {
    changeLocale: (locale: AvailableLocates) => void;
    region: AvailableLocates;
}) => {
    const regions: { title: string; region: AvailableLocates }[] = [
        {
            title: 'US',
            region: 'en'
        },
        {
            title: 'France',
            region: 'fr'
        },
        {
            title: 'Russia',
            region: 'ru'
        }
    ];

    return (
        <ToggleGroup.Root onChange={changeLocale} value={region}>
            {regions.map(({ title, region }, index) => (
                <ToggleGroup.Button key={title + index} value={region}>
                    {title}
                </ToggleGroup.Button>
            ))}
        </ToggleGroup.Root>
    );
};

const InputWithRange = ({
    value,
    setValue,
    label
}: {
    value: number;
    setValue: (value: number) => void;
    label: string;
}) => {
    return (
        <div>
            <NumberInput
                label={label}
                onChange={setValue}
                value={value}
                min={0} max={1000}
            />
            <Range
                size="sm"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
        </div>
    );
};

const ExportButton = ({ data }: { data: any }) => {
    return (
        <CSVLink data={data} filename="random_person" className="pt-4 md:pt-0">
            <Button className="w-full" icon={<BsFiletypeCsv size={20} />}>
                Export
            </Button>
        </CSVLink>
    );
};

function Home() {
    const { data, generateUsers, setMistake, region, changeLocale, mistake, setSeed, seed } =
        useFaker();
    const _ = useInfinitScroll(generateUsers);
    const [theme, toggleTheme] = useDarkMode();

    return (
        <div className="w-full h-full sm:px-10">
            <div className="py-6 flex justify-evenly items-center flex-wrap md:flex-nowrap">
                <LocaleToggle changeLocale={changeLocale} region={region} />
                <div className="flex md:gap-10 gap-4 flex-wrap justify-center">
                    <InputWithRange value={mistake} setValue={setMistake} label="Mistakes" />
                    <InputWithRange value={seed} setValue={setSeed} label="Seed" />
                </div>
                <ExportButton data={data} />
                <Button
                    onClick={() => toggleTheme()}
                    icon={<MdDarkMode size={40} />}
                    className="
                        bg-transparent
                        p-0 
                        flex 
                        justify-center 
                        items-center 
                        hover:bg-transparent 
                        text-gray-700 
                        dark:text-white
                    "
                />
            </div>
            <Table<Person>
                data={data}
                columns={[
                    {
                        title: '№',
                        field: 'num'
                    },
                    {
                        title: 'ID',
                        field: 'id'
                    },
                    {
                        title: 'Fullname',
                        field: 'fullname'
                    },
                    {
                        title: 'Adress',
                        field: 'adress'
                    },
                    {
                        title: 'Phone',
                        field: 'phone'
                    }
                ]}
            />
        </div>
    );
}

export default Home;
