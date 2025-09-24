"use client";

import { QuillField } from "@/form/QuillField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { ValidatedInput } from "./ValidatedInput";
import { ValidatedTextarea } from "./ValidatedTextarea";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
function validateMetaTitle(value: string) {
    if (!value) return "Meta title is required";
    if (value.length < 10) return "Meta title too short";
    if (value.length > 60) return "Meta title too long";
    return undefined;
}

function validateCanonicalUrl(value: string) {
    if (!value) return undefined;
    if (
        !/^\/[a-zA-Z0-9\-\/]*$/.test(value) &&
        !/^https?:\/\/[^\s]+$/.test(value)
    ) {
        return "Must be a valid URL or start with /";
    }
    return undefined;
}

const SeoAndArticleForm = ({ formik }: any) => {
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="basic-seo" 
                        // disabled={createContentOnly}
                        >
                            Basic SEO
                        </TabsTrigger>
                        <TabsTrigger value="social-media" 
                        // disabled={createContentOnly}
                        >
                            Social Media
                        </TabsTrigger>
                        <TabsTrigger value="technical" 
                        // disabled={createContentOnly}
                        >
                            Technical
                        </TabsTrigger>
                        <TabsTrigger value="schema" 
                        // disabled={createContentOnly}
                        >
                            Schema
                        </TabsTrigger>
                    </TabsList>

                    {/* Content Tab */}
                    <TabsContent value="content" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Page Content</CardTitle>
                                <CardDescription>
                                    Write and edit your page content using the rich text editor
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Page Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={cn(
                                            formik.touched.title &&
                                            formik.errors.title &&
                                            "border-red-500"
                                        )}
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <div className="border rounded-md">
                                        <QuillField
                                            value={formik.values.content}
                                            onChange={(value) =>
                                                formik.setFieldValue("content", value)
                                            }
                                        />
                                    </div>
                                    {formik.touched.content && formik.errors.content && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.content}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Basic SEO Tab */}
                    <TabsContent value="basic-seo" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic SEO</CardTitle>
                                <CardDescription>
                                    Configure basic SEO settings for search engines
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <ValidatedInput
                                            label="Meta Title"
                                            value={formik.values.metaTitle || ""}
                                            onChange={(value: any) =>
                                                formik.setFieldValue("metaTitle", value)
                                            }
                                            onBlur={() =>
                                                formik.setFieldTouched("metaTitle", true)
                                            }
                                            validator={validateMetaTitle as any}
                                            showCharacterCount={true}
                                            maxLength={60}
                                            minLength={10}
                                            placeholder="Enter meta title (10-60 characters)"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="keywords">Keywords</Label>
                                        <Input
                                            id="keywords"
                                            name="keywords"
                                            value={formik.values.keywords}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="keyword1, keyword2, keyword3"
                                        />
                                        {formik.touched.keywords && formik.errors.keywords && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {formik.errors.keywords}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <ValidatedTextarea
                                        label="Meta Description"
                                        value={formik.values.metaDescription || ""}
                                        onChange={(value: any) =>
                                            formik.setFieldValue("metaDescription", value)
                                        }
                                        onBlur={() =>
                                            formik.setFieldTouched("metaDescription", true)
                                        }
                                        showCharacterCount={true}
                                        maxLength={160}
                                        minLength={30}
                                        rows={3}
                                        placeholder="Enter meta description (30-160 characters)"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <ValidatedInput
                                            label="Canonical URL"
                                            value={formik.values.canonicalUrl || ""}
                                            onChange={(value: any) =>
                                                formik.setFieldValue("canonicalUrl", value)
                                            }
                                            onBlur={() =>
                                                formik.setFieldTouched("canonicalUrl", true)
                                            }
                                            validator={validateCanonicalUrl as any}
                                            placeholder="https://example.com/page or /page"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="noindex"
                                            checked={formik.values.noindex}
                                            onCheckedChange={(checked) =>
                                                formik.setFieldValue("noindex", checked)
                                            }
                                        />
                                        <Label htmlFor="noindex">
                                            Noindex (Hide from search engines)
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Social Media Tab */}
                    <TabsContent value="social-media" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Social Media</CardTitle>
                                <CardDescription>
                                    Configure Open Graph and Twitter Card settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Open Graph</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="ogTitle">OG Title</Label>
                                                <Input
                                                    id="ogTitle"
                                                    name="ogTitle"
                                                    value={formik.values.ogTitle}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.ogTitle &&
                                                    formik.errors.ogTitle && (
                                                        <p className="text-sm text-red-500 mt-1">
                                                            {formik.errors.ogTitle}
                                                        </p>
                                                    )}
                                            </div>

                                            <div>
                                                <Label htmlFor="ogImage">OG Image URL</Label>
                                                <Input
                                                    id="ogImage"
                                                    name="ogImage"
                                                    value={formik.values.ogImage}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="ogDescription">OG Description</Label>
                                            <Textarea
                                                id="ogDescription"
                                                name="ogDescription"
                                                value={formik.values.ogDescription}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                rows={3}
                                            />
                                            {formik.touched.ogDescription &&
                                                formik.errors.ogDescription && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.ogDescription}
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Twitter Card</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="twitterTitle">Twitter Title</Label>
                                                <Input
                                                    id="twitterTitle"
                                                    name="twitterTitle"
                                                    value={formik.values.twitterTitle}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.twitterTitle &&
                                                    formik.errors.twitterTitle && (
                                                        <p className="text-sm text-red-500 mt-1">
                                                            {formik.errors.twitterTitle}
                                                        </p>
                                                    )}
                                            </div>

                                            <div>
                                                <Label htmlFor="twitterImage">
                                                    Twitter Image URL
                                                </Label>
                                                <Input
                                                    id="twitterImage"
                                                    name="twitterImage"
                                                    value={formik.values.twitterImage}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="twitterDescription">
                                                Twitter Description
                                            </Label>
                                            <Textarea
                                                id="twitterDescription"
                                                name="twitterDescription"
                                                value={formik.values.twitterDescription}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                rows={3}
                                            />
                                            {formik.touched.twitterDescription &&
                                                formik.errors.twitterDescription && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.twitterDescription}
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Technical Tab */}
                    <TabsContent value="technical" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Technical SEO</CardTitle>
                                <CardDescription>
                                    Configure technical SEO settings for search engines
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="changefreq">Change Frequency</Label>
                                        <Select
                                            value={formik.values.changefreq}
                                            onValueChange={(value) =>
                                                formik.setFieldValue("changefreq", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="always">Always</SelectItem>
                                                <SelectItem value="hourly">Hourly</SelectItem>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="yearly">Yearly</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formik.touched.changefreq &&
                                            formik.errors.changefreq && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {formik.errors.changefreq}
                                                </p>
                                            )}
                                    </div>

                                    <div>
                                        <Label htmlFor="priority">Priority (0.0 - 1.0)</Label>
                                        <Input
                                            id="priority"
                                            name="priority"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="1"
                                            value={formik.values.priority}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={cn(
                                                formik.touched.priority &&
                                                formik.errors.priority &&
                                                "border-red-500"
                                            )}
                                        />
                                        {formik.touched.priority &&
                                            formik.errors.priority && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {formik.errors.priority}
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Schema Tab */}
                    {/* <TabsContent value="schema" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>JSON-LD Schema</CardTitle>
                <CardDescription>
                  Add structured data to help search engines understand your
                  content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <JsonSchemaEditor
                    label="JSON-LD Schema"
                    value={formik.values.schema}
                    onChange={(value: any) =>
                      formik.setFieldValue("schema", value)
                    }
                    onBlur={() => formik.setFieldTouched("schema", true)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={formatJsonSchema}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Format JSON</span>
                  </Button>
                  <p className="text-sm text-gray-500">
                    Use valid JSON format for structured data
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
                </Tabs>
            </form>
        </>
    )
}

export default SeoAndArticleForm