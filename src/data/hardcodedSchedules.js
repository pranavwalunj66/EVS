// Hardcoded waste collection schedules for the demo societies
const hardcodedSchedules = {
    // Green Valley Society (ID: 1)
    1: [
        {
            id: 'hs-1-1',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
            wasteType: 'organic',
            notes: 'Regular collection',
            isHardcoded: true,
        },
        {
            id: 'hs-1-2',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 12).toISOString(),
            wasteType: 'recyclable',
            notes: 'Separate plastic and paper',
            isHardcoded: true,
        },
        {
            id: 'hs-1-3',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 19).toISOString(),
            wasteType: 'organic',
            notes: 'Regular collection',
            isHardcoded: true,
        },
        {
            id: 'hs-1-4',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 26).toISOString(),
            wasteType: 'all',
            notes: 'Monthly deep cleaning',
            isHardcoded: true,
        },
    ],

    // Eco Park Residency (ID: 2)
    2: [
        {
            id: 'hs-2-1',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 3).toISOString(),
            wasteType: 'organic',
            notes: 'Composting day',
            isHardcoded: true,
        },
        {
            id: 'hs-2-2',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString(),
            wasteType: 'recyclable',
            notes: 'Recycling drive',
            isHardcoded: true,
        },
        {
            id: 'hs-2-3',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 17).toISOString(),
            wasteType: 'nonRecyclable',
            notes: 'Special collection for e-waste',
            isHardcoded: true,
        },
        {
            id: 'hs-2-4',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 24).toISOString(),
            wasteType: 'all',
            notes: 'Monthly collection day',
            isHardcoded: true,
        },
    ],

    // Sunrise Heights (ID: 3)
    3: [
        {
            id: 'hs-3-1',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString(),
            wasteType: 'organic',
            notes: 'Food waste collection',
            isHardcoded: true,
        },
        {
            id: 'hs-3-2',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 9).toISOString(),
            wasteType: 'recyclable',
            notes: 'Paper and cardboard only',
            isHardcoded: true,
        },
        {
            id: 'hs-3-3',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 16).toISOString(),
            wasteType: 'recyclable',
            notes: 'Plastic and metal only',
            isHardcoded: true,
        },
        {
            id: 'hs-3-4',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 23).toISOString(),
            wasteType: 'all',
            notes: 'General waste collection',
            isHardcoded: true,
        },
        {
            id: 'hs-3-5',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 30).toISOString(),
            wasteType: 'nonRecyclable',
            notes: 'Hazardous waste collection',
            isHardcoded: true,
        },
    ],

    // Green Meadows (ID: 4)
    4: [
        {
            id: 'hs-4-1',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 4).toISOString(),
            wasteType: 'organic',
            notes: 'Garden waste collection',
            isHardcoded: true,
        },
        {
            id: 'hs-4-2',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 11).toISOString(),
            wasteType: 'recyclable',
            notes: 'Recycling day',
            isHardcoded: true,
        },
        {
            id: 'hs-4-3',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 18).toISOString(),
            wasteType: 'organic',
            notes: 'Food waste collection',
            isHardcoded: true,
        },
        {
            id: 'hs-4-4',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 25).toISOString(),
            wasteType: 'all',
            notes: 'Monthly collection',
            isHardcoded: true,
        },
    ],

    // Nature's Nest (ID: 5)
    5: [
        {
            id: 'hs-5-1',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 6).toISOString(),
            wasteType: 'organic',
            notes: 'Composting initiative',
            isHardcoded: true,
        },
        {
            id: 'hs-5-2',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 13).toISOString(),
            wasteType: 'recyclable',
            notes: 'Plastic collection drive',
            isHardcoded: true,
        },
        {
            id: 'hs-5-3',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString(),
            wasteType: 'nonRecyclable',
            notes: 'Special waste collection',
            isHardcoded: true,
        },
        {
            id: 'hs-5-4',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 27).toISOString(),
            wasteType: 'all',
            notes: 'End of month cleanup',
            isHardcoded: true,
        },
    ],
};

export default hardcodedSchedules;
