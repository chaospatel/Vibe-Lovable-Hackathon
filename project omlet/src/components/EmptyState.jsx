export default function EmptyState({ title = "Nothing here", subtitle = "",
action }) {
return (
<div className="text-center py-16">
<h3 className="text-lg font-semibold">{title}</h3>
{subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
{action && <div className="mt-4">{action}</div>}
</div>
);
}
