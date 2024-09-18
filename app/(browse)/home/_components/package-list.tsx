import Image from "next/image";
import Link from "next/link";

import { type PackageType } from "@/types/package";
import { type Subject } from "@/types/subject";
import { Button } from "@/components/ui/button";
import { getPackagesBySubjectName } from "@/actions/package/get-package-by-subectName";

type PackageListProps = {
  subjectName: string;
  subject: Subject;
};

const PackageList = async ({ subjectName, subject }: PackageListProps) => {
  const packages: any = await getPackagesBySubjectName(subjectName);
  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div className="my-8" key={subject.id}>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">
          {subject.name} {`(${packages.length})`}
        </p>
        {packages?.length > 0 && (
          <Button variant="link" asChild>
            <Link href={`/course/${subject.id}`}>Xem thêm</Link>
          </Button>
        )}
      </div>
      <div className="my-4 grid gap-8 md:grid-cols-4">
        {packages?.map((packageItem: PackageType) => (
          <Link href={`/tutor/${packageItem.tutorId}?subject=${packageItem.subject.name}`} key={packageItem.tutorId}>
            <div className="flex cursor-pointer flex-col gap-8 rounded-md border p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:font-semibold">
              <div className="flex items-center justify-center overflow-hidden">
                <Image
                  src={isValidUrl(packageItem.tutor.avatar) ? packageItem.tutor.avatar : "/assets/avatar-tutor-2.png"}
                  alt="Avatar"
                  width={100}
                  height={100}
                  layout="intrinsic"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col justify-start gap-4 text-sm">
                <p className="flex items-center gap-4 text-xl font-semibold">{packageItem.tutor.fullName}</p>
                <p className="font-semibold">
                  {packageItem?.averageFeedbacksValue && `⭐ ${packageItem?.averageFeedbacksValue.toFixed(2)} | `}
                  Received Booking {packageItem?.totalReservations}
                </p>
                <div className="flex items-center gap-2 text-coin">
                  <Image src="/icons/coin.png" width={30} height={30} className="object-cover" alt="coin" />
                  {packageItem.pricePerHour} / hour
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
