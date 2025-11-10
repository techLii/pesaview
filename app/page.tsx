import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2Icon } from "lucide-react";



export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Building2Icon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">PesaView</CardTitle>
          <CardDescription className="text-base mt-2">
            Multi-tenant Transaction Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Please use your company-specific URL to access your dashboard:
          </p>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm">
              pesaview.com/<span className="text-primary font-semibold">company-name</span>
            </code>
          </div>
          <p className="text-xs text-muted-foreground">
            Contact your administrator if you need access to your company dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
