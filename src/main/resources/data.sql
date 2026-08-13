INSERT INTO locations (
    id,
    country,
    distance,
    estimated_travel_time,
    from_location,
    to_location,
    location_description
) VALUES (
    1,
    'USA',
    3940.0,
    '40 hours',
    'New York',
    'Los Angeles',
    'A long drive across the country.'
) ON DUPLICATE KEY UPDATE
    country = VALUES(country),
    distance = VALUES(distance),
    estimated_travel_time = VALUES(estimated_travel_time),
    from_location = VALUES(from_location),
    to_location = VALUES(to_location),
    location_description = VALUES(location_description);

INSERT INTO locations (
    id,
    country,
    distance,
    estimated_travel_time,
    from_location,
    to_location,
    location_description
) VALUES
    (
        2,
        'Switzerland',
        280.0,
        '4 hours',
        'Zurich',
        'Interlaken',
        'A scenic route through lakeside towns and alpine valleys.'
    ),
    (
        3,
        'Japan',
        515.0,
        '3 hours',
        'Tokyo',
        'Kyoto',
        'A cultural journey from modern Tokyo to historic Kyoto.'
    ),
    (
        4,
        'India',
        270.0,
        '6 hours',
        'Delhi',
        'Jaipur',
        'A heritage route through forts, palaces, and desert landscapes.'
    ),
    (
        5,
        'India',
        590.0,
        '10 hours',
        'Mumbai',
        'Goa',
        'Coastal drive from the financial capital to popular beach destinations.'
    ),
    (
        6,
        'India',
        140.0,
        '4 hours',
        'Kochi',
        'Munnar',
        'A lush journey through backwaters and tea plantations.'
    ),
    (
        7,
        'India',
        330.0,
        '6 hours',
        'Varanasi',
        'Agra',
        'Spiritual and historical route visiting ghats and the Taj Mahal.'
    ),
    (
        8,
        'India',
        250.0,
        '8 hours',
        'Shimla',
        'Manali',
        'A mountainous route across scenic hill stations and valleys.'
    ),
    (
        9,
        'China',
        1120.0,
        '11 hours',
        'Beijing',
        'Xi\'an',
        'Historic route from the capital to the ancient terracotta warriors city.'
    ),
    (
        10,
        'China',
        170.0,
        '2.5 hours',
        'Shanghai',
        'Hangzhou',
        'Fast route between the modern metropolis and scenic West Lake.'
    ),
    (
        11,
        'China',
        65.0,
        '1.5 hours',
        'Guilin',
        'Yangshuo',
        'Short picturesque trip featuring karst landscapes and rivers.'
    ),
    (
        12,
        'China',
        85.0,
        '2 hours',
        'Chengdu',
        'Leshan',
        'Visit the Giant Buddha and enjoy regional cuisine and culture.'
    )
ON DUPLICATE KEY UPDATE
    country = VALUES(country),
    distance = VALUES(distance),
    estimated_travel_time = VALUES(estimated_travel_time),
    from_location = VALUES(from_location),
    to_location = VALUES(to_location),
    location_description = VALUES(location_description);

INSERT INTO lodgings (
    id,
    address,
    lodging_description,
    lodging_name,
    lodging_type,
    rating
) VALUES (
    1,
    '123 Ocean Drive, Miami, FL',
    'A beautiful hotel overlooking the ocean.',
    'Beachfront Hotel',
    'Hotel',
    4.5
) ON DUPLICATE KEY UPDATE
    address = VALUES(address),
    lodging_description = VALUES(lodging_description),
    lodging_name = VALUES(lodging_name),
    lodging_type = VALUES(lodging_type),
    rating = VALUES(rating);

INSERT INTO lodgings (
    id,
    address,
    lodging_description,
    lodging_name,
    lodging_type,
    rating
) VALUES
    (
        2,
        'Hoheweg 41, Interlaken',
        'A mountain-view resort close to alpine trails and lake cruises.',
        'Alpine View Resort',
        'Resort',
        4.8
    ),
    (
        3,
        'Gion District, Kyoto',
        'A clean boutique hostel near temples, markets, and train access.',
        'Kyoto Heritage Hostel',
        'Hostel',
        4.2
    ),
    (
        4,
        'MI Road, Jaipur',
        'A comfortable heritage hotel with traditional decor and city access.',
        'Pink City Palace Hotel',
        'Hotel',
        4.6
    )
ON DUPLICATE KEY UPDATE
    address = VALUES(address),
    lodging_description = VALUES(lodging_description),
    lodging_name = VALUES(lodging_name),
    lodging_type = VALUES(lodging_type),
    rating = VALUES(rating);

INSERT INTO transports (
    id,
    estimated_travel_time,
    transport_description,
    transport_name,
    transport_type
) VALUES (
    1,
    '5 hours',
    'A comfortable luxury bus with reclining seats.',
    'Luxury Bus',
    'Bus'
) ON DUPLICATE KEY UPDATE
    estimated_travel_time = VALUES(estimated_travel_time),
    transport_description = VALUES(transport_description),
    transport_name = VALUES(transport_name),
    transport_type = VALUES(transport_type);

INSERT INTO transports (
    id,
    estimated_travel_time,
    transport_description,
    transport_name,
    transport_type
) VALUES
    (
        2,
        '4 hours',
        'Panoramic rail travel with large windows and reserved seats.',
        'Alpine Express',
        'Train'
    ),
    (
        3,
        '3 hours',
        'Fast domestic flight with airport transfers included.',
        'Skyline Flight',
        'Flight'
    ),
    (
        4,
        '6 hours',
        'Air-conditioned coach with local guide and rest stops.',
        'Royal Rajasthan Coach',
        'Bus'
    )
ON DUPLICATE KEY UPDATE
    estimated_travel_time = VALUES(estimated_travel_time),
    transport_description = VALUES(transport_description),
    transport_name = VALUES(transport_name),
    transport_type = VALUES(transport_type);

INSERT INTO tour (
    id,
    end_date,
    price,
    start_date,
    tickets_available,
    tour_description,
    tour_guide,
    tour_name,
    location_id,
    lodging_id,
    transport_id
) VALUES (
    1,
    '2026-12-05',
    1500.00,
    '2026-12-01',
    20,
    'A breathtaking tour of the Grand Canyon.',
    'John Doe',
    'Grand Canyon Adventure',
    1,
    1,
    1
) ON DUPLICATE KEY UPDATE
    end_date = VALUES(end_date),
    price = VALUES(price),
    start_date = VALUES(start_date),
    tickets_available = VALUES(tickets_available),
    tour_description = VALUES(tour_description),
    tour_guide = VALUES(tour_guide),
    tour_name = VALUES(tour_name),
    location_id = VALUES(location_id),
    lodging_id = VALUES(lodging_id),
    transport_id = VALUES(transport_id);

INSERT INTO tour (
    id,
    end_date,
    price,
    start_date,
    tickets_available,
    tour_description,
    tour_guide,
    tour_name,
    location_id,
    lodging_id,
    transport_id
) VALUES
    (
        2,
        '2026-09-18',
        2200.00,
        '2026-09-12',
        16,
        'Explore Swiss lakes, alpine villages, cable cars, and mountain viewpoints.',
        'Emma Muller',
        'Swiss Alps Explorer',
        2,
        2,
        2
    ),
    (
        3,
        '2026-10-10',
        1800.00,
        '2026-10-04',
        18,
        'Visit temples, gardens, markets, and old streets across Tokyo and Kyoto.',
        'Hiro Tanaka',
        'Tokyo Kyoto Culture Trail',
        3,
        3,
        3
    ),
    (
        4,
        '2026-11-08',
        950.00,
        '2026-11-03',
        24,
        'Discover Jaipur forts, royal palaces, bazaars, and regional cuisine.',
        'Aarav Sharma',
        'Jaipur Royal Heritage',
        4,
        4,
        4
    )
ON DUPLICATE KEY UPDATE
    end_date = VALUES(end_date),
    price = VALUES(price),
    start_date = VALUES(start_date),
    tickets_available = VALUES(tickets_available),
    tour_description = VALUES(tour_description),
    tour_guide = VALUES(tour_guide),
    tour_name = VALUES(tour_name),
    location_id = VALUES(location_id),
    lodging_id = VALUES(lodging_id),
    transport_id = VALUES(transport_id);

DELETE FROM tour_meals WHERE tour_id = 1;
INSERT INTO tour_meals (tour_id, meal) VALUES
    (1, 'Breakfast'),
    (1, 'Lunch'),
    (1, 'Dinner');

DELETE FROM tour_activities WHERE tour_id = 1;
INSERT INTO tour_activities (tour_id, activity) VALUES
    (1, 'Hiking'),
    (1, 'Rafting'),
    (1, 'Camping');

DELETE FROM tour_images WHERE tour_id = 1;
INSERT INTO tour_images (tour_id, image) VALUES
    (1, '/upload_images/1731996800279_download.jpg'),
    (1, '/upload_images/1731996800291_krishna3.jpg');

DELETE FROM tour_meals WHERE tour_id IN (2, 3, 4);
INSERT INTO tour_meals (tour_id, meal) VALUES
    (2, 'Breakfast'),
    (2, 'Dinner'),
    (2, 'Hot Chocolate'),
    (3, 'Breakfast'),
    (3, 'Sushi Lunch'),
    (3, 'Tea Tasting'),
    (4, 'Breakfast'),
    (4, 'Traditional Lunch'),
    (4, 'Dinner');

DELETE FROM tour_activities WHERE tour_id IN (2, 3, 4);
INSERT INTO tour_activities (tour_id, activity) VALUES
    (2, 'Cable Car Ride'),
    (2, 'Lake Cruise'),
    (2, 'Alpine Hiking'),
    (3, 'Temple Visit'),
    (3, 'Market Walk'),
    (3, 'Cultural Show'),
    (4, 'Fort Tour'),
    (4, 'Palace Visit'),
    (4, 'Bazaar Walk');

DELETE FROM tour_images WHERE tour_id IN (2, 3, 4);
INSERT INTO tour_images (tour_id, image) VALUES
    (2, '/upload_images/1733116889768_images.jpg'),
    (2, '/upload_images/1733116889900_krishna2.jpg'),
    (3, '/upload_images/1732530369214_download.jpg'),
    (3, '/upload_images/1732530369238_krishna3.jpg'),
    (4, '/upload_images/1733116980609_images.jpg'),
    (4, '/upload_images/1733116980733_krishna2.jpg');
