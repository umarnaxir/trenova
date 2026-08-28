import prisma from './lib/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  const adminEmail = 'umar@gmail.com';
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('1122', 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Umar Admin',
        role: 'SUPERADMIN'
      }
    });
    console.log(`Admin user ${adminEmail} created successfully.`);
  } else {
    console.log(`Admin user ${adminEmail} already exists.`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
