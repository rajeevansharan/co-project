const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Optional: Clear existing data
    await prisma.templeDocument.deleteMany();
    await prisma.templeCommittee.deleteMany();
    await prisma.temple.deleteMany();
    await prisma.artistAchievement.deleteMany();
    await prisma.artistAward.deleteMany();
    await prisma.artist.deleteMany();

    // ── Seed Temples ──────────────────────────────────────────────────────────
    const t1 = await prisma.temple.create({
        data: {
            templeRegNo: "TMP-2026-001",
            templeName: "Sri Murugan Kovil",
            tamilName: "ஸ்ரீ முருகன் கோவில்",
            address: "24, Temple Road, Nallur, Jaffna",
            district: "Jaffna",
            dsDivision: "Nallur",
            gnDivision: "Nallur North",
            phone: "021-222-4567",
            email: "srimurugan@temple.lk",
            website: "www.srimurugan.lk",
            bankName: "Bank of Ceylon",
            bankBranch: "Jaffna",
            accountName: "Sri Murugan Kovil Fund",
            accountNo: "1234567890",
            history: "Founded in 1842, this ancient temple is one of the most revered Hindu shrines in Northern Sri Lanka. It has been a center of worship for over 180 years.",
            status: "Approved",
            festivals: "Skanda Sashti, Thai Pusam, Chariot Festival",
            idols: "Lord Murugan, Goddess Valli, Goddess Devayani",
            socialActivities: "Free medical camp, Annual scholarship, Food donation program",
            committee: {
                create: {
                    presidentName: "Mr. Rajendran Subramaniam",
                    secretaryName: "Mrs. Kumari Sivakumar",
                }
            },
            documents: {
                create: [
                    { documentType: "Land Document", status: "Verified" },
                    { documentType: "Constitution", status: "Verified" },
                    { documentType: "Annual Report 2025", status: "Verified" },
                ]
            }
        }
    });

    const t2 = await prisma.temple.create({
        data: {
            templeRegNo: "TMP-2026-002",
            templeName: "Koneswaram Temple",
            tamilName: "கோணேஸ்வரம் கோயில்",
            address: "Swami Rock, Fort Frederick, Trincomalee",
            district: "Trincomalee",
            dsDivision: "Trincomalee Town",
            gnDivision: "Fort Frederick",
            phone: "026-223-5678",
            email: "koneswaram@temple.lk",
            website: "www.koneswaram.lk",
            bankName: "Peoples Bank",
            bankBranch: "Trincomalee",
            accountName: "Koneswaram Temple Trust",
            accountNo: "9876543210",
            history: "One of the five ancient Shiva temples (Pancha Ishwarams) of Sri Lanka, perched on the famous Swami Rock overlooking the Indian Ocean.",
            status: "Pending",
            festivals: "Maha Shivaratri, Navaratri, Karthigai Deepam",
            idols: "Lord Shiva (Koneswaram), Goddess Parvati, Lord Ganesha",
            socialActivities: "Annadhanam (free meals), Education trust, Medical assistance",
            committee: {
                create: {
                    presidentName: "Mr. Balakumar Krishnan",
                    secretaryName: "Mr. Selvarajan Ponnusamy",
                }
            },
            documents: {
                create: [
                    { documentType: "Land Document", status: "Pending" },
                    { documentType: "Constitution", status: "Verified" },
                ]
            }
        }
    });

    console.log(`Created Temples: ${t1.templeRegNo}, ${t2.templeRegNo}`);

    // ── Seed Artists ──────────────────────────────────────────────────────────
    const a1 = await prisma.artist.create({
        data: {
            nic: "199845623412",
            tamilName: "இரவீந்திரன் சுரேஷ்",
            englishName: "Ravindran Suresh",
            otherNames: "Ravi",
            dob: "1998-03-14",
            gender: "Male",
            permanentAddress: "12, Raja Mawatha, Nallur, Jaffna",
            currentAddress: "45, Temple Road, Colombo 15",
            phone: "077-123-4567",
            education: "B.A. (Fine Arts) — University of Jaffna\nDiploma in Classical Dance — Lalitha Kala Akademi",
            category: "Classical Dance",
            literaryCategory: null,
            expertise: "Bharatanatyam, Kuchipudi",
            servicePeriod: "2010 – Present (16 years)",
            biography: "Ravindran Suresh is a distinguished classical dance artist from Jaffna who has dedicated over 16 years to preserving and promoting Bharatanatyam. He has performed at national and international stages promoting Sri Lankan Tamil cultural heritage.",
            status: "Approved",
            achievements: {
                create: [
                    { title: "Siva Thandavam", year: 2015, type: "Artistic Work" },
                    { title: "Murugan Leela", year: 2018, type: "Artistic Work" },
                    { title: "Shakti", year: 2022, type: "Artistic Work" },
                    { title: "UNESCO Cultural Ambassador", year: 2021, type: "Recognition" },
                    { title: "Presidential Award for Arts", year: 2022, type: "Recognition" },
                ]
            },
            awards: {
                create: [
                    { awardName: "National Cultural Award", year: 2020 },
                    { awardName: "Best Performer – Jaffna Arts Festival", year: 2019 },
                ]
            }
        }
    });

    const a2 = await prisma.artist.create({
        data: {
            nic: "200012346789",
            tamilName: "மீனாட்சி பிரியா",
            englishName: "Meenakshi Priya",
            otherNames: null,
            dob: "2000-08-22",
            gender: "Female",
            permanentAddress: "78, Main Street, Batticaloa",
            currentAddress: "78, Main Street, Batticaloa",
            phone: "065-234-5678",
            education: "B.Mus. — Eastern University Sri Lanka\nGrade 8 Trinity College London (Carnatic Vocals)",
            category: "Music",
            literaryCategory: "Tamil Poetry",
            expertise: "Carnatic Music, Tamil Devotional Songs",
            servicePeriod: "2015 – Present (11 years)",
            biography: "Meenakshi Priya is a celebrated Carnatic vocalist from Batticaloa who has been performing since the age of 15. She is known for her soul-stirring devotional music.",
            status: "Pending",
            achievements: {
                create: [
                    { title: "Swaramalai", year: 2023, type: "Publication" },
                    { title: "Divya Prabandham Renditions", year: 2021, type: "Artistic Work" },
                    { title: "Navratri Special Concert", year: 2023, type: "Artistic Work" },
                    { title: "Best Vocalist – Sri Lanka Tamil Music Awards", year: 2023, type: "Recognition" }
                ]
            },
            awards: {
                create: [
                    { awardName: "Eastern Province Youth Award", year: 2022 }
                ]
            }
        }
    });

    console.log(`Created Artists: ${a1.nic}, ${a2.nic}`);

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
