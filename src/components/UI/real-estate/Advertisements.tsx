import Image from "next/image";

export default function Advertisements() {
  const ads = [
    {
      id: 1,
      title: "إعلان مميز",
      description: "عروض خاصة على الشقق في القاهرة الجديدة",
      imageUrl: "/ad-placeholder-1.jpg",
      url: "#",
    },
    {
      id: 2,
      title: "تخفيضات الصيف",
      description: "خصومات تصل إلى 20% على الفلل",
      imageUrl: "/ad-placeholder-2.jpg",
      url: "#",
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">إعلانات</h2>
      <div className="space-y-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="overflow-hidden rounded-md border border-gray-200"
          >
            <div className="relative h-32">
              <Image
                src={ad.imageUrl}
                alt={ad.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800">{ad.title}</h3>
              <p className="text-sm text-gray-600">{ad.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
