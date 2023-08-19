import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2';

type TableColumn<Entry> = {
    title: string;
    field: keyof Entry;
    Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
    data: Entry[];
    columns: TableColumn<Entry>[];
};

export const Table = <Entry extends { id: string }>({ data, columns }: TableProps<Entry>) => {
    if (!data?.length) {
        return (
            <div className="flex flex-col items-center justify-center h-80 bg-white dark:bg-dark-900 dark:text-white/80 text-gray-500">
                <HiOutlineArchiveBoxXMark size={60} />
                <h2 className="text-xl">No Entries Found</h2>
            </div>
        );
    }
    return (
        <div className="relative sm:rounded-md overflow-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-600 dark:text-white">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={column.title + index} scope="col" className="px-6 py-3">
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, entryIndex) => (
                        <tr
                            key={entry?.id || entryIndex}
                            className={`
                                ${
                                    entryIndex % 2 === 0
                                        ? 'bg-white dark:bg-dark-300'
                                        : 'bg-gray-50 dark:bg-dark-400'
                                }
                                border-b
                                dark:border-0
                                dark:text-white/80
                            `}
                        >
                            {columns.map(({ Cell, field, title }, columnIndex) => (
                                <td key={title + columnIndex} className="px-6 py-4">
                                    {Cell ? <Cell entry={entry} /> : (entry[field] as string)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
