import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Transaction {
    amount: number
}

export default function TotalAmount({ transactions }: { transactions: Transaction[] }) {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    const formattedTotal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
    }).format(total)

    return (
        <Card className="w-full bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Total amount collected</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold text-center">{formattedTotal}</p>
            </CardContent>
        </Card>
    )
}

